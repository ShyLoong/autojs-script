// [注意事项] 打开任务界面

//页面切换时间间隙默认为4396毫秒,可以根据网络情况修改
let timeGap = 4396 ;
//8s浏览任务时间默认为14396毫秒,可以根据网络情况修改
let viewTime = 14396;

start()
function start() {
    console.show();
    auto.waitFor();
    app.launch("com.jingdong.app.mall");
    while (!textContains("累计任务奖励").exists()) {
        // className("android.view.View").textContains("打卡领红包").findOne().click()
        log("请打开任务界面!");
        sleep(timeGap);
    }
    //任务一已完成
    let hasFinishedTask1 = 0;
    while (1) {
        // 任务类型一,浏览8s任务
        if (hasFinishedTask1 == 0 && textContains("8s").exists()) {
            //设置标志位
            hasFinishedTask1 = 1;
            //做两个任务
            for (let i = 0; i < 2; i++) {
                let task_8s = className("android.view.View").textContains("8s").find();
                if (task_8s[i] && task_8s[i].parent()) {
                    let text = task_8s[i].parent().child(1).text();
                    let allTaskNum = getAllTaskNum(text);
                    let finishedTaskNum = getFinishedTaskNum(text);
                    for (let j = finishedTaskNum; j < allTaskNum; j++) {
                        if (task_8s[i] && task_8s[i].parent()) {
                            log(task_8s[i].parent().child(1).text());
                            log("浏览8s任务");
                            task_8s[i].parent().child(3).click();
                            sleep(viewTime);
                            back();
                            sleep(timeGap);
                            //完成一次任务后重置
                            hasFinishedTask1 = 0;
                        } else {
                            hasFinishedTask1 = 0;
                            break;
                        }
                    }
                }
            }
        }
        //任务类型二,累计浏览加购5个商品
        else if (textContains("累计浏览").exists() && !isFinish("累计浏览")) {
            let win = textContains("累计浏览").findOnce().parent();
            log(win.child(1).text());
            log("累计浏览5个商品");
            let text = win.child(1).text();
            let allTaskNum = getAllTaskNum(text);
            let finishedTaskNum = getFinishedTaskNum(text);
            win.child(3).click();
            sleep(timeGap*2);
            let inlineWin = textStartsWith("¥").findOnce().parent().parent();
            for (let i = Number(finishedTaskNum); i < Number(allTaskNum); i++) {
                log("浏览第" + (i + 1) + "个商品");
                if (!inlineWin) {
                    back();
                    sleep(timeGap);
                }
                inlineWin.child(i).child(5).click();
                sleep(timeGap*2);
                back();
                sleep(timeGap);
            }
            back();//返回任务界面
            sleep(timeGap);
            //完成一次任务后重置
            hasFinishedTask1 = 0;
        }
        //任务类型三,普通点击浏览任务
        else if (textStartsWith("浏览可得").exists() && !isFinish("浏览可得")) {
            let win = textStartsWith("浏览可得").findOnce().parent();
            log(win.child(1).text());
            log("普通点击浏览任务");
            win.child(3).click();
            sleep(timeGap);
            zhongc();
            back();
            sleep(timeGap);
            //完成一次任务后重置
            hasFinishedTask1 = 0;
        }
        else if (textStartsWith("浏览并关注可得").exists() && !isFinish("浏览并关注可得")) {
            log(textStartsWith("浏览并关注可得").findOnce().parent().child(1).text());
            log("普通点击浏览任务");
            className("android.view.View").textStartsWith("浏览并关注可得").findOne().parent().child(3).click();
            sleep(timeGap);
            zhongc();
            back();
            sleep(timeGap);
            //完成一次任务后重置
            hasFinishedTask1 = 0;
        }
        else if (textContains("小程序").exists() && !isFinish("小程序")) {
            let win = textContains("小程序").findOnce().parent();
            log(win.child(1).text());
            log("普通点击浏览任务");
            win.child(3).click();
            sleep(timeGap);
            back();
            sleep(timeGap);
            //完成一次任务后重置
            hasFinishedTask1 = 0;
        }
        else if (textContains("入会").exists() && !isFinish("入会")) {
            log(textContains("入会").findOnce().parent().child(1).text());
            log("浏览入会界面，获取金币");
            className("android.view.View").textContains("入会").findOne().parent().child(3).click();
            sleep(timeGap);
            if (textContains("加入店铺会员").exists()) {
                log("脚本结束（涉及个人隐私,请手动加入店铺会员)");
                break;
            }
            back();
            sleep(timeGap);
            //完成一次任务后重置
            hasFinishedTask1 = 0;
        }
        //结束
        else {
            log("四种任务已完成，若有剩余可再启动一次脚本或手动完成");
            break;
        }
        //避免弹窗,返回任务界面
        for (let i = 1; !textContains("累计任务奖励").exists() && i <= 5; i++) {
            if (i == 5) {
                log("无法返回任务界面,脚本结束");
                exit();
            }
            log("无法返回任务界面,第" + i + "次尝试返回(最多4次)");
            back();
            sleep(timeGap);
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
            task.child(2).child(5).click();
            sleep(timeGap);
            back();
            sleep(timeGap);
        }
    }
}
function isFinish(keyWord) {
    let str;
    if (keyWord == "浏览可得" || keyWord == "浏览并关注可得" || keyWord == "参与") {
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