# Deno deploy

基于 [Deno Deploy](https://deno.com/deploy/docs/) 的前后端一体化开发。

## 需要的权限

- `--allow-env` - 为了获取 `SERVER_APP_ENV` 的值
- `--allow-net` - [mime_types] 需要获取远程数据
- `--allow-read` - [mime_types] 和静态资源需要

具体说明请查看 [permissions](https://deno.land/manual@v1.15.3/getting_started/permissions)。

## 快速开始

你需要全局安装 [deno]。

```bash
# 启动服务 - 生产模式
$ deno run --import-map=./import_map.json --allow-net --allow-read ./mod.ts

# 启动服务 - 开发模式
$ deno run --watch --import-map=./import_map.json --allow-net --allow-read ./mod.ts

# 启用检查器
$ deno run --inspect --import-map=./import_map.json --allow-net --allow-read ./mod.ts
```

如果你本地有 `npm` 工具，可以使用如下命令:

```bash
# 启动服务 - 生产模式
$ npm start

# 启动服务 - 开发模式
$ npm run dev

# 启用检查器
$ npm run inspect
```

## License

- MIT

[deno]: https://deno.land/manual/getting_started/installation
[mime_types]: https://deno.land/x/mime_types@1.0.0
