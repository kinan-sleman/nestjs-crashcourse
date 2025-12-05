### CREATE RESOURCE FOR PROFILE(profile.controller.ts , profile.entity.ts , profile.module.ts):
```json
nest g resource profile
```
### after that select (Rest Api) :
```json
? What transport layer do you use?
❯ REST API
  GraphQL (code first)
  GraphQL (schema first)
  Microservice (non-HTTP)
  WebSockets
```
### after that add Y:
```json
? Would you like to generate CRUD entry points? (Y/n)
```
### after that you can see this files created:
```json
D:\Nest JS\projects\blog-nest>nest g resource profile
(node:13276) [DEP0190] DeprecationWarning: Passing args to a child process with shell option true can lead to security vulnerabilities, as the arguments are not escaped, only concatenated.
(Use `node --trace-deprecation ...` to show where the warning was created)       
✔ What transport layer do you use? REST API
✔ Would you like to generate CRUD entry points? Yes
CREATE src/profile/profile.controller.ts (980 bytes)
CREATE src/profile/profile.controller.spec.ts (606 bytes)
CREATE src/profile/profile.module.ts (271 bytes)
CREATE src/profile/profile.service.ts (675 bytes)        
CREATE src/profile/profile.service.spec.ts (485 bytes)   
CREATE src/profile/dto/create-profile.dto.ts (34 bytes)  
CREATE src/profile/dto/update-profile.dto.ts (185 bytes)
CREATE src/profile/entities/profile.entity.ts (25 bytes)
UPDATE package.json (2671 bytes)
UPDATE src/app.module.ts (846 bytes)
⠋ Installing packages (npm)...(node:21168) [DEP0190] DeprecationWarning: Passing 
args to a child process with shell option true can lead to security vulnerabilities, as the arguments are not escaped, only concatenated.
(Use `node --trace-deprecation ...` to show where the warning was created)       
✔ Packages installed successfully.

D:\Nest JS\projects\blog-nest>c
```

after that delete this files we don't need it:
```json
- profile.controller.spec.ts
- profile.service.spec.ts
```