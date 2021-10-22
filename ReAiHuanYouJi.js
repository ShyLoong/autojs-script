// [注意事项] 打开任务界面
start()
function start() {
    auto.waitFor()
    app.launch("com.jingdong.app.mall")
    // toast("请打开京东app首页")
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
        toast("请打开任务界面!")
        sleep(6000)
    }
    function isFinish(keyWord) {
        let str
        if (keyWord == "浏览可得" || keyWord == "浏览并关注" || keyWord == "参与") {
            str = textStartsWith(keyWord).findOnce().parent().child(1).text()
        } else {
            str = textContains(keyWord).findOnce().parent().child(1).text()
        }
        toast(str)
        let finishedTask = str.charAt(str.length - 4)
        let allTask = str.charAt(str.length - 2)
        sleep(3000)
        if (finishedTask == allTask) {
            return true
        }
        return false
    }
    function isFinishByText(text) {
        toast(text)
        let finishedTask = text.charAt(text.length - 4)
        let allTask = text.charAt(text.length - 2)
        sleep(3000)
        if (finishedTask == allTask) {
            return true
        }
        return false
    }
    while (1) {

        //任务类型二,累计浏览加购5个商品
        if (textContains("累计浏览").exists() && !isFinish("累计浏览")) {
            toast("累计浏览5个商品")
            className("android.view.View").textContains("累计浏览").findOne().parent().child(3).click()
            sleep(5000)
            let win = textStartsWith("¥").findOnce().parent().parent()
            for (let i = 0; i < 5; i++) {
                toast("浏览第" + (i + 1) + "个商品")
                win.child(i).child(5).click();
                sleep(5000)
                back()
                sleep(3000)
            }
            back()//返回任务界面
            sleep(3000)
        }
        //任务类型三,普通点击浏览任务
        else if (textStartsWith("浏览可得").exists() && !isFinish("浏览可得")) {
            toast("普通点击浏览任务")
            className("android.view.View").textStartsWith("浏览可得").findOne().parent().child(3).click()
            sleep(5000)
            back()
            sleep(3000)
        }
        else if (textStartsWith("浏览并关注").exists() && !isFinish("浏览并关注")) {
            toast("普通点击浏览任务")
            className("android.view.View").textStartsWith("浏览并关注").findOne().parent().child(3).click()
            sleep(5000)
            back()
            sleep(3000)
        }
        // else if (textStartsWith("参与").exists() && !isFinish("参与")) {
        //     toast("普通点击浏览任务")
        //     className("android.view.View").textStartsWith("参与").findOne().parent().child(3).click()
        //     sleep(5000)
        //     back()
        //     sleep(3000)
        // }
        //任务类型四,入会
        else if (textContains("入会").exists() && !isFinish("入会")) {
            toast("浏览入会界面，获取金币")
            className("android.view.View").textContains("入会").findOne().parent().child(3).click()
            sleep(3000)
            if (textContains("加入店铺会员").exists()) {
                toast("脚本结束（涉及个人隐私,请手动加入店铺会员或者忽略加入会员任务)")
                break
            }
            back()
            sleep(3000)
        }
        // 任务类型一,浏览8s任务
        else if (textContains("8s").exists()&& !isFinish("8s")) {
            let task_8s = className("android.view.View").textContains("8s").find();
            for (let i = 1; i < task_8s.length; i++) {
                toast(task_8s.length)
                for (let j = 0; !isFinishByText(task_8s[i].parent().child(1).text()) && j < 7; j++) {
                    toast("浏览8s任务")
                    task_8s[i].parent().child(3).click()
                    sleep(12000)
                    back()
                    sleep(3000)
                }
            }

        }
        //结束
        else {
            toast("所有任务已完成，若有剩余可再启动一次脚本或手动完成")
            break
        }
    }
}