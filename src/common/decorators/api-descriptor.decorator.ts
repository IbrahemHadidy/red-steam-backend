import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeaders,
  ApiQuery,
  ApiTags,
  ApiSecurity,
  ApiOAuth2,
  ApiParamOptions,
  ApiResponseOptions,
  ApiBodyOptions,
  ApiQueryOptions,
  ApiHeaderOptions,
  ApiConsumes,
} from '@nestjs/swagger';
import { SecurityRequirementObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface ApiDescriptorOptions {
  summary?: string;
  description?: string;
  parameters?: ApiParamOptions[];
  body?: ApiBodyOptions;
  responses?: ApiResponseOptions[];
  tags?: string[];
  security?: string[] | SecurityRequirementObject[];
  query?: ApiQueryOptions;
  headers?: ApiHeaderOptions[];
  authBearer?: string | null;
  oauth2?: any;
  exclude?: any;
  consumes?: string[];
}

/**
 * Custom Swagger decorator for defining API operations with multiple Swagger decorators.
 * @param options Options for defining the API operation.
 * @returns A combination of Swagger decorators based on the provided options.
 */
export function ApiDescriptor(options: ApiDescriptorOptions) {
  const {
    summary,
    description,
    parameters,
    body,
    responses,
    tags,
    security,
    query,
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
    ...((security?.map((security: string | SecurityRequirementObject) => ApiSecurity(security))) || []),
    ...((query && [ApiQuery({ ...query })]) || []),
    ...((headers && [ApiHeaders(headers)]) || []),
    ...((authBearer && [ApiBearerAuth(authBearer)]) || []),
    ...((oauth2 && [ApiOAuth2(oauth2)]) || []),
    ...((exclude && [ApiExcludeEndpoint(exclude)]) || []),
    ...((consumes && [ApiConsumes(...consumes)]) || []),
  );
}