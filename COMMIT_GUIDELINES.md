# Hướng dẫn Commit

Để đảm bảo rằng code của chúng ta luôn nhất quán và dễ dàng quản lý, tất cả các thành viên trong nhóm cần tuân theo các hướng dẫn commit dưới đây.

## Định dạng tên branch

Tên branch phải tuân theo một trong hai định dạng sau:

1. **Fixes**: `fix/(content)`
2. **Features**: `feat/(content)`

## Định dạng nội dung commit

Nội dung commit phải tuân theo định dạng sau: `type(scope): description`

### Các loại (type) commit:

- `feat`: Thêm mới hoặc cập nhật các chức năng
- `fix`: Sửa lỗi
- `build`: Thay đổi liên quan đến quy trình build
- `config`: Thay đổi liên quan đến cấu hình
- `api`: Thay đổi liên quan đến API
- `auth`: Thay đổi liên quan đến chức năng xác thực người dùng
- `db`: Thay đổi liên quan đến cơ sở dữ liệu
- `doc`: Thay đổi liên quan đến tài liệu
- `test`: Thay đổi liên quan đến tests
- `style`: Thay đổi liên quan đến CSS/styles
- `route`: Thay đổi liên quan đến routes
- `seo` : Thay đổi hoặc tạo mới liên quan đến SEO

### Ví dụ về commit:

#### Features:

- `feat(view): Add responsive design for multiple screen sizes`
- `feat(api): Implement new endpoints for user data`
- `feat(auth): Add JWT-based authentication`

#### Fixes:

- `fix(view): Correct issue with state clearing on /result route`
- `fix(api): Resolve bug in user data retrieval`
- `fix(style): Fix CSS issue on the login page`
