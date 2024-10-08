// NestJS
import { applyDecorators } from '@nestjs/common';

// Swagger decorators
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiHeaders,
  ApiOAuth2,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

// Types
import type {
  ApiBodyOptions,
  ApiHeaderOptions,
  ApiParamOptions,
  ApiQueryOptions,
  ApiResponseOptions,
} from '@nestjs/swagger';
import type { SecurityRequirementObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface ApiDescriptorOptions {
  summary?: string;
  description?: string;
  parameters?: ApiParamOptions[];
  body?: ApiBodyOptions;
  responses?: ApiResponseOptions[];
  tags?: string[];
  security?: string[] | SecurityRequirementObject[];
  queries?: ApiQueryOptions[];
  headers?: ApiHeaderOptions[];
  authBearer?: string | null;
  oauth2?: { scopes: string[]; name?: string };
  exclude?: boolean;
  consumes?: string[];
}

/**
 * Custom Swagger decorator for defining API operations with multiple Swagger decorators.
 * @param options Options for defining the API operation.
 * @returns A combination of Swagger decorators based on the provided options.
 */
export function ApiDescriptor(options: ApiDescriptorOptions): MethodDecorator {
  const {
    summary,
    description,
    parameters,
    body,
    responses,
    tags,
    security,
    queries,
    headers,
    authBearer,
    oauth2,
    exclude,
    consumes,
  } = options;

  return applyDecorators(
    ApiOperation({ summary, description }),
    ...(parameters?.map((parameter: ApiParamOptions) => ApiParam(parameter)) || []),
    ...((body && [ApiBody(body)]) || []),
    ...(responses?.map((response: ApiResponseOptions) => ApiResponse(response)) || []),
    ...((tags && [ApiTags(...tags)]) || []),
    ...(security?.map((security: string | SecurityRequirementObject) => ApiSecurity(security)) || []),
    ...(queries?.map((query: ApiQueryOptions) => ApiQuery(query)) || []),
    ...((headers && [ApiHeaders(headers)]) || []),
    ...((authBearer && [ApiBearerAuth(authBearer)]) || []),
    ...((oauth2 && [ApiOAuth2(oauth2.scopes)]) || []),
    ...((exclude && [ApiExcludeEndpoint(exclude)]) || []),
    ...((consumes && [ApiConsumes(...consumes)]) || []),
  );
}
