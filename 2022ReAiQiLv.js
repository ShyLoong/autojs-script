// 热爱奇旅
// 任务一 8s可得
// 任务二 累计浏览
// 任务三 入会
// 任务四 小程序
// 任务五 普通点击
// todo 封装任务为独立方法

//2022
// [注意事项] 打开任务界面
//页面切换时间间隙默认为1396毫秒,可以根据网络情况修改
let timeGap = 2396;
//8s浏览任务时间默认为10396毫秒,可以根据网络情况修改
let viewTime = 12396;

start();
function start() {
    console.show();
    auto.waitFor();
    app.launch("com.jingdong.app.mall");
    while (!isTaskView()) {
        log("请打开任务界面!");
        sleep(timeGap);
    }
    while (isTaskView()) {
        // 任务类型一,浏览8s任务
        if (textContains("8s").exists() && !isFinish("8s")) {
            //可能会出现多个8s任务
            let task_8s = className("android.view.View").textContains("8s").find();
            for (let i = 0; i < task_8s.length; i++) {
                let text = task_8s[i].parent().child(1).text();
                let allTaskNum = getAllTaskNum(text);
                let finishedTaskNum = getFinishedTaskNum(text);
                for (let j = finishedTaskNum; j < allTaskNum; j++) {
                    log("去完成第" + j + "个浏览8s任务");
                    if (task_8s[i] && task_8s[i].parent()) {
                        view8STask(task_8s[i]);
                    } else {
                        //避免弹窗报错
                        back();
                        sleep(timeGap);
                        view8STask(task_8s[i]);
                    }
                }
            }
            refresh();
        }
        // 任务类型二,累计浏览4个商品
        else if (textContains("累计浏览").exists() && !isFinish("累计浏览")) {
            let win = textContains("累计浏览").findOnce().parent();
            log(win.child(1).text());
            let text = win.child(1).text();
            let allTaskNum = getAllTaskNum(text);
            let finishedTaskNum = getFinishedTaskNum(text);
            // win.child(3).click();
            let b = win.child(3).bounds();
            click(b.centerX(), b.centerY());
            sleep(timeGap * 2);
            let inlineWin = textStartsWith("¥").findOnce().parent().parent().parent();
            for (let i = finishedTaskNum; i < allTaskNum; i++) {
                log("浏览第" + (i + 1) + "个商品");
                // inlineWin.child(i).child(5).click();
                if (i == 4) {
                    //超过四个滑动窗口再点击
                    swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 3, 2000);
                }
                let b = inlineWin.child(i).child(4).bounds();
                click(b.centerX(), b.centerY());
                sleep(timeGap * 2);
                back();
                sleep(timeGap);
                for (let i = 0; !className("android.view.View").textContains("浏览4个商品").findOnce() && !className("android.view.View").textContains("浏览加购4个商品").findOnce() && i < 4; i++) {
                    if (i == 3) {
                        log("请重新执行脚本")
                        exit();
                    }
                    back();
                    sleep(timeGap);
                    log("无法返回加购页面,第" + (i + 1) + "次返回(最多三次)");
                }
            }
            refresh();
        }//结束
        else {
            log("四种任务已完成，若有剩余可再启动一次脚本或手动完成");
            break;
        }
    }
}
function getAllTaskNum(text) {
    let allTask = text.charAt(text.length - 2)
    return allTask;
}
function getFinishedTaskNum(text) {
    let finishedTask = text.charAt(text.length - 4)
    return finishedTask;
}
function zhongc() {
    if (textContains("互动种草").exists()) {
        let task = className("android.view.View").text("5000汪汪币").findOne().parent().parent();
        for (let i = 0; i < 5; i++) {
            log("浏览第" + (i + 1) + "个商品");
            // task.child(2).child(5).click();
            let b = task.child(2).child(4).bounds();
            click(b.centerX(), b.centerY());
            sleep(timeGap);
            back();
            sleep(timeGap);
        }
    }
}
function isFinish(keyWord) {
    let str;
    if (keyWord == "8s") {
        let task_8s = className("android.view.View").textContains("8s").find();
        for (let i = 0; i < task_8s.length; i++) {
            let text = task_8s[i].parent().child(1).text();
            let allTaskNum = getAllTaskNum(text);
            let finishedTaskNum = getFinishedTaskNum(text);
            if (allTaskNum > finishedTaskNum) {
                return false;
            }
        }
        return true;
    }else if (keyWord == "浏览可得" || keyWord == "浏览并关注可得" || keyWord == "参与") {
        str = textStartsWith(keyWord).findOnce().parent().child(1).text();
    } else {
        str = textContains(keyWord).findOnce().parent().child(1).text();
    }
    let finishedTask = str.charAt(str.length - 4);
    let allTask = str.charAt(str.length - 2);
    sleep(timeGap)
    if (finishedTask >= allTask) {
        return true;
    }
    return false;
}
function refresh() {
    while (!isTaskView()) {
        back();
        sleep(timeGap);
    }
    let b0 = className("android.view.View").text("做任务 赚金币做任务 赚金币").findOne().parent().child(1).bounds();
    click(b0.centerX(), b0.centerY());
    log("关闭窗口")
    sleep(timeGap);
    if (className("android.widget.TextView").text("抽奖").exists) {
        let win = className("android.widget.TextView").text("抽奖").findOnce().parent().parent().parent().parent();
        let b = win.child(5).bounds();
        click(b.centerX(), b.centerY());
        sleep(timeGap);
        if (isTaskView()) {
            log("刷新成功");
        }
    }
}
function view8STask(node) {
    let b = node.parent().child(3).bounds();
    click(b.centerX(), b.centerY());
    sleep(viewTime);
    back();
    sleep(timeGap);
}
function isTaskView() {
    return textContains("累计任务奖励").exists();
}