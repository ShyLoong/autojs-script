// [注意事项] 打开任务界面
start()
function start() {
    console.show();
    auto.waitFor();
    app.launch("com.jingdong.app.mall");
    // log("请打开京东app首页")
    // className("android.widget.TextView").descContains("搜索框").findOne().click()
    // sleep(1000)
    // descContains("搜索框").findOne().setText("热爱环游记")
    // className("android.widget.TextView").text("搜索").findOne().click()
    // sleep(3000)//等一下再点
    // click(500, 1000)
    // sleep(3000)
    // sleep(3000)
    while (!textContains("累计任务奖励").exists()) {
        // className("android.view.View").textContains("打卡领红包").findOne().click()
        log("请打开任务界面!");
        sleep(6000);
    }
    let count = 0;
    while (1) {
        // 任务类型一,浏览8s任务
        if (count < 3 && textContains("8s").exists()) {
            count++;
            for (let i = 0; i < 2; i++) {
                let task_8s = className("android.view.View").textContains("8s").find();
                if (task_8s[i] && task_8s[i].parent()) {
                    for (let j = 0; !isFinishByText(task_8s[i].parent().child(1).text()) && j < 7; j++) {
                        count = 0;
                        if (task_8s[i]&&task_8s[i].parent()) {
                            log("浏览8s任务");
                            task_8s[i].parent().child(3).click();
                            sleep(12000);
                            back();
                            sleep(3000);
                        }else{
                            break;
                        }
                    }
                }
            }
        }
        //任务类型二,累计浏览加购5个商品
        else if (textContains("累计浏览").exists() && !isFinish("累计浏览")) {
            log("累计浏览5个商品");
            className("android.view.View").textContains("累计浏览").findOne().parent().child(3).click();
            sleep(5000);
            let win = textStartsWith("¥").findOnce().parent().parent();
            for (let i = 0; i < 5; i++) {
                log("浏览第" + (i + 1) + "个商品");
                win.child(i).child(5).click();
                sleep(5000);
                back();
                sleep(3000);
            }
            back();//返回任务界面
            sleep(3000);
        }
        //任务类型三,普通点击浏览任务
        else if (textStartsWith("浏览可得").exists() && !isFinish("浏览可得")) {
            log("普通点击浏览任务");
            className("android.view.View").textStartsWith("浏览可得").findOne().parent().child(3).click();
            sleep(5000);
            if (textContains("互动种草").exists()) {
                let task = className("android.view.View").text("5000汪汪币").findOne().parent().parent();
                for (let i = 0; i < 5; i++) {
                    task.child(2).child(5).click();
                    sleep(5000);
                    back();
                    sleep(3000);
                }
            }
            back();
            sleep(3000);
        }
        else if (textStartsWith("浏览并关注可得").exists() && !isFinish("浏览并关注可得")) {
            log("普通点击浏览任务");
            className("android.view.View").textStartsWith("浏览并关注可得").findOne().parent().child(3).click();
            sleep(5000);
            if (textContains("互动种草").exists()) {
                let task = className("android.view.View").text("5000汪汪币").findOne().parent().parent();
                for (let i = 0; i < 5; i++) {
                    task.child(2).child(5).click();
                    sleep(5000);
                    back();
                    sleep(3000);
                }
            }
            back();
            sleep(3000);
        }
        // else if (textStartsWith("参与").exists() && !isFinish("参与")) {
        //     log("普通点击浏览任务")
        //     className("android.view.View").textStartsWith("参与").findOne().parent().child(3).click()
        //     sleep(5000)
        //     back()
        //     sleep(3000)
        // }
        //任务类型四,入会
        else if (textContains("入会").exists() && !isFinish("入会")) {
            log("浏览入会界面，获取金币");
            className("android.view.View").textContains("入会").findOne().parent().child(3).click();
            sleep(3000);
            if (textContains("加入店铺会员").exists()) {
                log("脚本结束（涉及个人隐私,请手动加入店铺会员或者忽略加入会员任务)");
                break;
            }
            back();
            sleep(3000);
        }
        //结束
        else {
            log("四种任务已完成，若有剩余可再启动一次脚本或手动完成");
            break;
        }
        //避免弹窗,返回任务界面
        for (let i = 1; !textContains("累计任务奖励").exists() && i <= 5; i++) {
            if (i == 5) {
                toast("无法返回任务界面,脚本结束");
                exit();
            }
            toast("无法返回任务界面,第" + i + "次尝试返回(最多4次)");
            sleep(1000);
            back();
            sleep(3000);
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
    log(str);
    let finishedTask = str.charAt(str.length - 4);
    let allTask = str.charAt(str.length - 2);
    sleep(3000)
    if (finishedTask == allTask) {
        return true;
    }
    return false;
}
function isFinishByText(text) {
    log(text);
    let finishedTask = text.charAt(text.length - 4);
    let allTask = text.charAt(text.length - 2);
    sleep(3000);
    if (finishedTask == allTask) {
        return true;
    }
    return false;
}
// function taskNum(text) {
//     log(text)
//     let finishedTask = text.charAt(text.length - 4)
//     let allTask = text.charAt(text.length - 2)
//     return allTask-finishedTask;
// }