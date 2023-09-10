import { execa } from 'execa'
// import fs from "fs"

(async () => {
  try {
    var datetime = new Date();

    // this will save potential changes that might get lost if you didn't commit them
    await execa("git", ["stash", "push", "-m", "before deploy on " + datetime]);
    await execa("git", ["checkout", "--orphan", "gh-pages"]);

    console.log("Building...")

    await execa("yarn", ["run", "build"])
    // Understand if it's dist or build folder
    const folderName = "docs/.vitepress/dist"
    await execa("git", ["--work-tree", folderName, "add", "--all"])
    await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"])

    console.log("Pushing to gh-pages...")

    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"])
    await execa("rm", ["-r", folderName])
    await execa("git", ["fetch"])
    await execa("git", ["checkout", "-f", "main"])
    await execa("git", ["branch", "-D", "gh-pages"])

    console.log("Successfully deployed")
  } catch (e) {

    console.log(e.message)
    process.exit(1)
  }
})();