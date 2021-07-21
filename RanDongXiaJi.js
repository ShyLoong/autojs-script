start();
function start() {
    auto.waitFor();
    app.launch("com.jingdong.app.mall");
    while (className("android.widget.Image").text("c143642ad0850f7a").findOnce() == null) {
        toast("请进入活动界面");
        sleep(3000);
    }
    if (className("android.widget.Image").text("c143642ad0850f7a").exists()) {
        toast("成功进入活动界面");
        sleep(3000);
        while (textContains("运动+").exists()) {
            textContains("运动+").findOnce().click();
            toast("收集运动卡币");
            sleep(3000);
        }
        while (textContains("任务+").exists()) {
            textContains("任务+").findOnce().click();
            toast("收集任务卡币");
            sleep(3000);
        }
    }
    doTask();
}
function doTask() {
    className("android.widget.Image").text("c143642ad0850f7a").findOne().parent().click()
    toast("打开任务界面");
    sleep(3000);

    //关键字作为任务类型
    var hasTask = true;
    while (hasTask) {
        if (textMatches(/.*[0-9]秒.*/).exists() && textMatches(/.*[0-9]秒.*/).findOnce().parent().child(8).text() == "去完成") {
            textMatches(/.*[0-9]秒.*/).findOnce().parent().child(8).click();
            sleep(10000);
        } else if (textContains("浏览加购").exists() && textContains("浏览加购").findOnce().parent().child(8).text() == "去完成") {
            textContains("浏览加购").findOnce().parent().child(8).click();
            sleep(3000);
            for (var i = 0; i < 5; i++) {
                className("android.view.View").scrollable(true).depth(15).findOne().child(i).child(0).child(4).click();
                toast("加购第" + (i + 1) + "个商品");
                sleep(5000);
                back();
                sleep(3000);
            }
            toast("浏览加购完成，返回");
        } else if (textContains("浏览").exists() && textContains("浏览").findOnce().parent().child(8).text() == "去完成") {
            textContains("浏览").findOnce().parent().child(8).click();
            sleep(3000);
            toast("浏览完成，返回");
        } else if (textStartsWith("参与可得").exists() && textStartsWith("参与可得").findOnce().parent().child(8).text() == "去完成") {
            textStartsWith("参与可得").findOnce().parent().child(8).click();
            sleep(3000);
            toast("浏览完成，返回");
        } else if (textContains("成功入会").exists() && textContains("成功入会").findOnce().parent().child(8).text() == "去完成") {
            textContains("成功入会").findOnce().parent().child(8).click();
            sleep(3000);
            if (textContains("加入店铺会员").exists()) {
                toast("脚本结束（涉及个人隐私,请手动加入店铺会员或者忽略加入会员任务)");
                break;
            }
            toast("浏览入会界面，获取金币");
        }
        else {
            toast("所有任务已完成，若有剩余可再启动一次脚本或手动完成");
            break;
        }
        sleep(1000);//给提示一个显示的时间
        back();
        sleep(3000);
        for (var i = 1; !className("android.widget.Image").text("c143642ad0850f7a").exists() && i <= 5; i++) {
            if (i == 5) {
                toast("无法返回任务界面,脚本结束");
                exit();
            }
            toast("无法返回任务界面,第" + i + "次尝试返回(最多4次)");
            sleep(1000);
            back();
            sleep(3000);
        }//避免弹窗,返回任务界面
    }
}