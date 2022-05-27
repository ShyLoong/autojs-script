/***********************************************/
// [热爱奇旅]
// 任务一 8s浏览任务
// 任务二 浏览加购任务
// 任务三 普通点击任务
// 任务四 入会

// [注意事项] 
// - 请打开任务界面

/***********************************************/

// [可配置变量]
//页面切换时间间隙默认为2396毫秒,可以根据网络情况修改
let timeGap = 2396;
//8s浏览任务时间默认为13396毫秒,可以根据网络情况修改
let viewTime = 13396;
//是否暂停浏览入会界面
//默认为true，如果已开通大多数会员可设置为false。
let pauseJoinMember = true;

// [全局变量]
//浏览可得关键字任务可使用标志
let enableFlag1 = true;
//入会关键字任务可使用标志
let enableFlag2 = true;

/***********************************************/
start();
end();
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
                log(text);
                for (let j = finishedTaskNum; j < allTaskNum; j++) {
                    log("第" + (Number(j) + 1) + "次浏览");
                    if (task_8s[i] && task_8s[i].parent()) {
                        view8STask(task_8s[i]);
                    } else {
                        log("未返回任务界面，请重新启动脚本");
                        end();
                    }
                }
            }
            refresh();
        }
        // 任务类型二,累计浏览4个商品
        else if (textContains("累计浏览").exists() && !isFinish("累计浏览")) {
            let win = textContains("累计浏览").findOnce().parent();
            let text = win.child(1).text();
            let allTaskNum = getAllTaskNum(text);
            let finishedTaskNum = getFinishedTaskNum(text);
            log(text);
            // win.child(3).click();
            let b = win.child(3).bounds();
            click(b.centerX(), b.centerY());
            sleep(timeGap * 2);
            let inlineWin = textStartsWith("¥").findOnce().parent().parent().parent();
            for (let i = finishedTaskNum; i < allTaskNum; i++) {
                log("浏览第" + (Number(i) + 1) + "个商品");
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
                        end();
                    }
                    back();
                    sleep(timeGap);
                    log("无法返回加购页面,第" + (i + 1) + "次返回(最多三次)");
                }
            }
            refresh();
        }
        // 任务三 点击浏览类型
        else if (textStartsWith("浏览可得").exists() && !isFinish("浏览可得") && enableFlag1) {
            handleCommonViewTask("浏览可得");
        }
        else if (textStartsWith("浏览并关注可得").exists() && !isFinish("浏览并关注可得")) {
            handleCommonViewTask("浏览并关注可得");
        }
        else if (textStartsWith("去参与小程序").exists() && !isFinish("去参与小程序")) {
            handleCommonViewTask("去参与小程序");
        }
        else if (textStartsWith("点击首页浮层").exists() && !isFinish("点击首页浮层")) {
            handleCommonViewTask("点击首页浮层");
        }
        // 任务四 入会类型
        else if (textContains("入会").exists() && !isFinish("入会") && enableFlag2) {
            log(textContains("入会").findOnce().parent().child(1).text());
            // className("android.view.View").textContains("入会").findOne().parent().child(3).click();
            let b = className("android.view.View").textContains("入会").findOne().parent().child(3).bounds();
            click(b.centerX(), b.centerY());
            sleep(timeGap);
            if ((textContains("加入店铺会员").exists() || textContains("授权信息，解锁全部会员福利").exists()) && pauseJoinMember) {
                log("涉及个人隐私,请手动加入店铺会员");
                enableFlag2 = false;
            }
            refresh();
        }
        //结束
        else {
            log("四种任务已完成，若有剩余可再启动一次脚本或手动完成");
            end();
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
    } else if (keyWord == "浏览可得" || keyWord == "浏览并关注可得" || keyWord == "参与") {
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
    // log("关闭窗口")
    sleep(timeGap / 2);
    if (className("android.widget.TextView").text("抽奖").exists) {
        let win = className("android.widget.TextView").text("抽奖").findOnce().parent().parent().parent().parent();
        let b = win.child(5).bounds();
        click(b.centerX(), b.centerY());
        sleep(timeGap/2);
        if (isTaskView()) {
            log("刷新成功");
        }
    }
}
function end(){
    log("脚本免费开源，github链接为https://github.com/ShyLoong/autojs-script");
    exit();
}
function view8STask(node) {
    let b = node.parent().child(3).bounds();
    click(b.centerX(), b.centerY());
    sleep(viewTime);
    while (!isTaskView()) {
        back();
        sleep(timeGap);
    }
}
function isTaskView() {
    return textContains("累计任务奖励").exists();
}
function handleCommonViewTask(keyWord) {
    let text = textStartsWith(keyWord).findOnce().parent().child(1).text();
    let allTaskNum = getAllTaskNum(text);
    let finishedTaskNum = getFinishedTaskNum(text);
    log(text);
    if (text.indexOf("去逛逛并下单") != -1) {
        //下单任务无法完成
        enableFlag1 = false;
        log("下单任务无法完成")
        refresh();
        return;
    }
    if (text.indexOf("种草城") != -1) {
        let b = className("android.view.View").textStartsWith(keyWord).findOne().parent().child(3).bounds();
        click(b.centerX(), b.centerY());
        sleep(timeGap * 2);
        if (textStartsWith("喜欢").clickable().exists()) {
            let arr = textStartsWith("喜欢").clickable().find();
            let rand = random(0,arr.length-4);
            for (let i = rand; i < rand+(allTaskNum-finishedTaskNum); i++) {
                log("点击喜欢");
                arr[i].click();
                sleep(timeGap);
                while (!textStartsWith("喜欢").clickable().exists()) {
                    back();
                    sleep(timeGap);
                }
            }
        }
        refresh();
        return;
    }
    for (let j = finishedTaskNum; j < allTaskNum; j++) {
        log("第" + (Number(j) + 1) + "次浏览");
        let b = className("android.view.View").textStartsWith(keyWord).findOne().parent().child(3).bounds();
        click(b.centerX(), b.centerY());
        sleep(timeGap);
        //返回任务界面
        while (!isTaskView()) {
            back();
            sleep(timeGap);
        }
    }
    refresh();
}
