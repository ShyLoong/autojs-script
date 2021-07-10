//点击做任务领金币
run();
function run() {
    auto.waitFor();
    var appName = "com.jingdong.app.mall";
    var hasFoundDoTask = text("做任务领金币").findOnce();
    while (hasFoundDoTask == null) {
        sleep(2000);
        hasFoundDoTask = text("做任务领金币").findOnce();
        toast("请打开任务界面")
    }
    if (hasFoundDoTask != null) {
        hasFoundDoTask.click();
        sleep(1000);
        goFinish();
    }
    // else {
    //     toast("未检测到任务,请打开任务界面,再执行脚本");
    //     exit();
    // }
}
function goFinish() {
    var tasks = text("去完成").find();
    for (var i = 1; i < tasks.length; i++) {
        sleep(2000);
        if (tasks[i] == null) {
            continue;
        }
        tasks[i].click();
        sleep(8000);
        while (true) {
            if (textContains("逛精选").exists()) {
                sleep(random(9000, 10000));
                //弹出关注时返回
                back();
                sleep(2000);
                tasks[i].click();
                sleep(8000);
            }
            else {
                back();
                break;
            }
        }
    }
    toast("任务完成");
}