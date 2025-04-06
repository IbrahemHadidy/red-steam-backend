"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _testing = require("@nestjs/testing");
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _dropboxmodule = require("./dropbox.module");
const _avatarstorageservice = require("./avatar-storage.service");
const _invalidfileexception = require("../../../common/exceptions/invalid-file.exception");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('AvatarStorageService', ()=>{
    let avatarStorageService;
    let logger;
    beforeAll(async ()=>{
        const module = await _testing.Test.createTestingModule({
            imports: [
                _config.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: [
                        `src/common/configs/environments/.env.${process.env.NODE_ENV}.local`,
                        `src/common/configs/environments/.env.${process.env.NODE_ENV}`,
                        'src/common/configs/environments/.env'
                    ]
                }),
                _dropboxmodule.DropboxModule
            ],
            providers: [
                _avatarstorageservice.AvatarStorageService,
                _common.Logger,
                _config.ConfigService
            ]
        }).compile();
        avatarStorageService = module.get(_avatarstorageservice.AvatarStorageService);
        logger = module.get(_common.Logger);
    });
    afterEach(async ()=>{
        jest.clearAllMocks();
        cleanupTestFiles();
    });
    afterAll(()=>{
        cleanupTestFiles();
    });
    function cleanupTestFiles() {
        const testFilesDir = _path.default.resolve(__dirname);
        const filesToDelete = [
            'test.png',
            'test.gif'
        ];
        filesToDelete.forEach((fileName)=>{
            const filePath = _path.default.join(testFilesDir, fileName);
            if (_fs.default.existsSync(filePath)) {
                _fs.default.unlinkSync(filePath);
            }
        });
    }
    describe('uploadAvatar', ()=>{
        it('should upload avatar successfully', async ()=>{
            const filePath = _path.default.resolve(__dirname, 'test.png');
            const fileContent = Buffer.from([
                1,
                2,
                3
            ]);
            // Create a test file if it doesn't exist
            if (!_fs.default.existsSync(filePath)) {
                _fs.default.writeFileSync(filePath, fileContent);
            }
            const file = {
                fieldname: 'avatar',
                originalname: 'avatar.png',
                encoding: '7bit',
                mimetype: 'image/png',
                size: fileContent.length,
                buffer: fileContent,
                path: filePath
            };
            const result = await avatarStorageService.uploadAvatar(file);
            // Assertions
            expect(result.sharedLink).toBeDefined();
        });
        it('should throw an error if the file type is not allowed', async ()=>{
            const filePath = _path.default.resolve(__dirname, 'test.gif');
            const fileContent = Buffer.from('test');
            // Create a test file
            if (!_fs.default.existsSync(filePath)) {
                _fs.default.writeFileSync(filePath, fileContent);
            }
            const file = {
                fieldname: 'avatar',
                originalname: 'avatar.gif',
                encoding: '7bit',
                mimetype: 'image/gif',
                size: fileContent.length,
                buffer: fileContent,
                path: filePath
            };
            // Assertions
            await expect(avatarStorageService.uploadAvatar(file)).rejects.toThrow(_invalidfileexception.InvalidFileException);
        });
    });
    describe('deleteAvatar', ()=>{
        it('should delete avatar successfully', async ()=>{
            // Mock the logger
            const loggerSpy = jest.spyOn(logger, 'log');
            const filePath = _path.default.resolve(__dirname, 'test.png');
            const fileContent = Buffer.from([
                1,
                2,
                3
            ]);
            // Create a test file
            if (!_fs.default.existsSync(filePath)) {
                _fs.default.writeFileSync(filePath, fileContent);
            }
            const file = {
                fieldname: 'avatar',
                originalname: 'avatar.png',
                encoding: '7bit',
                mimetype: 'image/png',
                size: fileContent.length,
                buffer: fileContent,
                path: filePath
            };
            const result = await avatarStorageService.uploadAvatar(file);
            const avatarId = result.sharedLink.split('/avatar-')[1].split('?')[0];
            await avatarStorageService.deleteAvatar(avatarId);
            // Assertions
            expect(loggerSpy).toHaveBeenCalledWith(`Avatar ${avatarId} deleted successfully`);
        });
    });
});

//# sourceMappingURL=avatar-storage.service.spec.js.map