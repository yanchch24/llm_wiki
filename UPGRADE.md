# 上游升级手册

本仓库是 [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) 的个人定制 fork。
远程约定：`origin` = 本 fork，`upstream` = 原项目。

## 定制原则（新增改动务必遵守）

1. **开关集中在 `src/lib/local-build.ts`**：所有"隐藏上游功能 / 固定上游行为"类偏好只改这一个文件。
2. **上游文件只留最小接入点**：一行 import + 一处条件判断，绝不删除上游代码。
3. **自有新功能放在独立目录**（如 `src/custom/`），通过少量接入点挂载。
4. **一类改动一个提交**，便于 rebase 时逐提交解决冲突。
5. **不 rebase 已推送的提交**：日常在 si 分支上开发，测试全绿后由所有者决定合并到 main。

## 当前已有定制

- UI 语言固定为中文，输出语言固定为 Chinese，语言选择控件已隐藏（`SHOW_LANGUAGE_CONTROLS = false`）
- 更新检查与更新日志入口已禁用（`SHOW_UPDATE_AND_CHANGELOG = false`），持久层始终返回禁用状态

## 升级步骤

```bash
git checkout si
git fetch upstream --tags
git log si..upstream/main --oneline   # 了解上游更新内容
git rebase upstream/main
npm run typecheck
npm run test:mocks
git push origin si --force-with-lease
```

## 冲突处理

冲突预计只出现在接入行：

- `src/components/settings/settings-view.tsx` — 分类过滤
- `src/components/settings/sections/interface-section.tsx` / `output-section.tsx` — 控件隐藏
- `src/components/project/create-project-dialog.tsx` — 语言选择隐藏
- `src/lib/project-store.ts` — 固定值函数
- `src/stores/update-store.ts` — 更新状态门控

原则：**保留上游新代码 + 保留本仓库的一行接入点**。
冲突过乱时 `git rebase --abort` 退出重来。

## 验证清单

- [ ] `npm run typecheck` 通过
- [ ] `npm run test:mocks` 通过
- [ ] 界面为中文，设置页无语言选择
- [ ] 设置页无"更新日志"分类，About 无"检查更新"卡片
- [ ] 启动后控制台无 `[update-check]` 请求 GitHub 的日志

## 跟随策略

可只跟随正式版本：`git rebase v0.6.13`（替换为最新 tag），不必每次追 `upstream/main`。
