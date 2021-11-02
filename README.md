# Deno deploy

基于 [Deno Deploy](https://deno.com/deploy/docs/) 的前后端一体化开发。

## 快速开始

你需要全局安装 [deno]。

```bash
# 启动服务 - 生产模式
$ deno run --allow-net --allow-read ./main.ts

# 启动服务 - 开发模式
$ deno run --watch --allow-net --allow-read ./main.ts

# 启用检查器
$ deno run --inspect --allow-net --allow-read ./main.ts
```

需要 `--allow-net` 是因为使用了 [mime_types] 这个库。

需要 `--allow-read` 是因为使用了本地文件读取的功能。

## License

- MIT

[deno]: https://deno.land/manual/getting_started/installation
[mime_types]: https://deno.land/x/mime_types@1.0.0
