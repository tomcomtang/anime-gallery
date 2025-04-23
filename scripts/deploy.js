// 部署脚本 - 可以使用Node.js运行此脚本来部署到GitHub Pages
const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// 确保out目录存在
if (!fs.existsSync(path.join(process.cwd(), "out"))) {
  console.error("构建目录不存在，请先运行 npm run build")
  process.exit(1)
}

// 在out目录中创建.nojekyll文件，防止GitHub Pages忽略下划线开头的文件
fs.writeFileSync(path.join(process.cwd(), "out", ".nojekyll"), "")

try {
  // 初始化git仓库（如果尚未初始化）
  execSync("git init", { stdio: "inherit" })

  // 添加GitHub远程仓库（如果尚未添加）- 请替换为您的GitHub仓库URL
  // execSync('git remote add origin https://github.com/yourusername/your-repo-name.git', { stdio: 'inherit' });

  // 创建gh-pages分支
  execSync("git checkout -b gh-pages", { stdio: "inherit" })

  // 添加构建文件
  execSync("git add -f out/", { stdio: "inherit" })

  // 提交更改
  execSync('git commit -m "Deploy to GitHub Pages"', { stdio: "inherit" })

  // 推送到gh-pages分支
  execSync("git subtree push --prefix out origin gh-pages", { stdio: "inherit" })

  console.log("成功部署到GitHub Pages!")
} catch (error) {
  console.error("部署过程中出错:", error)
}
