    /**
     * @author ius.
     * @date 2022/8/1
     * @introduction 获取QQ好友列表
     */
    function getCookie(aim) {
        const allText = document.cookie.replace(/\s*/g, ''); //document.cookie
        oneText = allText.split(";");
        for (var two of oneText) {
            const three = two.split("=");
            if (aim === three[0]) {
                return two;
            }
        }
    }

    const gtk = user.getToken();
    const uin = getCookie("uin").substring(5);
    const xhr = new XMLHttpRequest();
    const qzonetoken = window.shine0callback;
    var url = 'https://mobile.qzone.qq.com/friend/mfriend_list?qzonetoken=' + qzonetoken + '&g_tk=' + gtk + '&res_uin=' + uin + '&res_type=normal&format=json&count_per_page=10&page_index=0&page_type=0&mayknowuin=&qqmailstat=';
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const json = JSON.parse(xhr.responseText)
            const allGroup = json.data.gpnames;
            const allFriend = json.data.list;
            var consoleContext = "";
            for (var groupid of allGroup) {
                consoleContext += groupid["gpname"] + ":\n";
                for (const friendid of allFriend) {
                    if (groupid["gpid"] === friendid["groupid"]) {
                        consoleContext += "  " + friendid["remark"] + "(" + friendid["uin"] + ")" + "\n";
                    }
                }
            }
            console.log(consoleContext);
        }
    }
    xhr.open('GET', url)
    xhr.withCredentials = true;
    xhr.send()
