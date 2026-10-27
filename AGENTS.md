# AGENTS.md — 本仓库 Agent 编写统一约束

本仓库是 [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki)（GPL-3.0）的个人定制 fork。
任何 Agent / AI 在本仓库工作前，必须先阅读本文件并遵守以下约束。

## 1. 分支流程

- `main`：稳定分支 = 上游最新 + 已验证定制。**禁止直接在 main 上开发。**
- `si`：集成分支。所有新改动（上游升级、新功能、定制调整）先进入 `si`，
  测试全部通过后，由仓库所有者决定何时合并到 `main`。
- 远程约定：`origin` = 本 fork（SSH），`upstream` = 原项目。
- **禁止 rebase / force push 已推送的提交**；日常提交正常推送即可。

## 2. 上游升级适配（详见 UPGRADE.md）

```bash
git checkout si
git fetch upstream --tags
git rebase upstream/main
npm run typecheck && npm run test:mocks
git push origin si --force-with-lease   # 仅 rebase 后需要
```

## 3. 定制原则（核心，违反即返工）

1. **开关集中**：所有"隐藏上游功能 / 固定上游行为"的偏好只写在
   `src/lib/local-build.ts`，其他文件只读取开关，不得散落硬编码。
2. **上游文件只留最小接入点**：一行 import + 一处条件判断。
   **绝不删除上游代码**——上游实现保持完整，便于升级合并。
3. **自有新功能放独立目录**：新建代码放 `src/custom/`（或同级独立模块），
   通过少量接入点挂载，不与上游逻辑交织。
4. **一类改动一个提交**：每个提交只做一件事，提交信息用
   `feat:` / `fix:` / `docs:` / `chore:` 前缀（与上游风格一致）。
5. **不修改 LICENSE 与上游版权声明**（GPL-3.0 要求）。

## 4. 当前已有定制（勿破坏）

- UI 语言固定中文，输出语言固定 Chinese，语言控件隐藏
  （`SHOW_LANGUAGE_CONTROLS = false`）
- 更新检查与更新日志禁用（`SHOW_UPDATE_AND_CHANGELOG = false`），
  持久层 `project-store.ts` 始终返回禁用状态

## 5. 验证要求（每次改动后）

- `npm run typecheck` 必须通过
- `npm run test:mocks` 必须全绿
- 涉及门控的改动：确认设置页无语言选择、无更新日志分类、
  About 无检查更新卡片、控制台无 `[update-check]` 请求
- 新功能必须附带测试（vitest，与现有 `*.test.ts` 风格一致）

## 6. 提交与推送

- 只有在 typecheck + 测试全部通过后才允许推送
- 推送目标：`si` 分支；**不主动合并到 main，不主动推送 main**
- 提交信息用英文祈使句，正文说明动机（参考 git log 现有风格）
