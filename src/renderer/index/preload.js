/**
 * 课程列表页面
 */
function lessonListPage() {
    const lessonList = document.querySelector("#lessonList");
    if (lessonList !== null) {
        lessonList.querySelectorAll("li").forEach(item => {
            let isFinished = false;
            for (let i = 0; i < item.classList.length; i++) {
                if (item.classList[i] === "imgywc") {
                    isFinished = true;
                    break;
                }
            }
            if (!isFinished) {
                window.location.href = item.querySelector("a:first-of-type").href;
            }
        });
        return true;
    }
    return false;
}
/**
 * 中文时间转换秒数
 * @param {string} timeString
 */
function time2unix(timeString) {
    const regexp = /^用时(?:(\d+)天)?(?:(\d+)小?时)?(?:(\d+)分钟?)?(?:(\d+)秒钟?)?.*需(?:(\d+)天)?(?:(\d+)小?时)?(?:(\d+)分钟?)?(?:(\d+)秒钟?)?$/gi;
    const lessonTimeDay = parseInt(timeString.replace(regexp, "$1") === "" ? "0" : timeString.replace(regexp, "$1"));
    const lessonTimeHour = parseInt(timeString.replace(regexp, "$2") === "" ? "0" : timeString.replace(regexp, "$2"));
    const lessonTimeMinute = parseInt(timeString.replace(regexp, "$3") === "" ? "0" : timeString.replace(regexp, "$3"));
    const lessonTimeSecond = parseInt(timeString.replace(regexp, "$4") === "" ? "0" : timeString.replace(regexp, "$4"));
    const lessonTimeRequiredDay = parseInt(
        timeString.replace(regexp, "$5") === "" ? "0" : timeString.replace(regexp, "$5")
    );
    const lessonTimeRequiredHour = parseInt(
        timeString.replace(regexp, "$6") === "" ? "0" : timeString.replace(regexp, "$6")
    );
    const lessonTimeRequiredMinute = parseInt(
        timeString.replace(regexp, "$7") === "" ? "0" : timeString.replace(regexp, "$7")
    );
    const lessonTimeRequiredSecond = parseInt(
        timeString.replace(regexp, "$8") === "" ? "0" : timeString.replace(regexp, "$8")
    );
    return {
        lessonTime: lessonTimeDay * 24 * 60 * 60 + lessonTimeHour * 60 * 60 + lessonTimeMinute * 60 + lessonTimeSecond,
        lessonTimeRequired:
            lessonTimeRequiredDay * 24 * 60 * 60 +
            lessonTimeRequiredHour * 60 * 60 +
            lessonTimeRequiredMinute * 60 +
            lessonTimeRequiredSecond
    };
}
window.addEventListener("load", event => {
    const { href, origin } = window.location;
    if (href === `${origin}/index.php/home/Index/index.html`) {
        const loginForms = document.querySelector("#loginForms");
        if (loginForms !== null) {
            const { ipcRenderer } = require("electron");
            console.log(ipcRenderer);
            ipcRenderer.on("event-from-renderer", (e, data) => {
                console.log("electron", e, data);
            });
            loginForms.querySelector("input[name='email']").value = "";
            loginForms.querySelector("input[name='password']").value = "";
            loginForms.querySelector("button[type='submit']").click();
        }
        if (
            document.querySelector(".sbtn") &&
            document.querySelector(".sbtn").href === `${origin}/index.php/mooc/Index/student.html`
        ) {
            const allLessonTime = document.querySelector(".login-widget ._body .xs_s_l span:first-of-type").innerText;
            const allLessonTimeRequired = document.querySelector(".login-widget ._body .xs_s_l span:last-of-type")
                .innerText;
            if (allLessonTime < allLessonTimeRequired) {
                window.location.href = document.querySelector(".sbtn").href;
            } else {
                alert("您已学完全部课时，无需学习");
            }
        }
    }
    if (href === `${origin}/index.php/mooc/Index/student.html`) {
        if (lessonListPage()) {
            window.location.href = document.querySelector(".tab_title h2:nth-child(2) a").href;
        }
    }
    if (href === `${origin}/index.php/mooc/Index/student/status/4.html`) {
        lessonListPage();
    }
    if (/^http:\/\/ytwldx\.soocedu\.com\/index\.php\/course\/Index\/index\/kcid\/\w+\.html$/g.test(href)) {
        const progress = document.querySelector(".r_b_progress");
        if (progress !== null) {
            const { lessonTime, lessonTimeRequired } = time2unix(
                progress.querySelector(".xw_process > span").innerText
            );
            localStorage.setItem("lesson_time", lessonTime);
            localStorage.setItem("lesson_time_required", lessonTimeRequired);
            window.location.href = progress.querySelector(".r_b_progress_r a").href;
        }
    }
    if (/^http:\/\/ytwldx\.soocedu\.com\/index\.php\/course\/Index\/detail\/kcid\/.*\.html$/g.test(href)) {
        let startTime = 0;
        const lessonTime = parseInt(localStorage.getItem("lesson_time"));
        const lessonTimeRequired = parseInt(localStorage.getItem("lesson_time_required"));
        const timeDiv = document.createElement("div");
        timeDiv.setAttribute("id", "time_display");
        document.querySelector("body").appendChild(timeDiv);
        const timeDisplay = document.querySelector("#time_display");
        timeDisplay.style.position = "absolute";
        timeDisplay.style.zIndex = 9999999999999999;
        timeDisplay.style.fontSize = "30px";
        timeDisplay.style.color = "#ff0000";
        timeDisplay.style.top = "50%";
        timeDisplay.style.left = "50%";
        timeDisplay.style.transform = "translate(-50%, -50%)";
        const interval = setInterval(() => {
            startTime += 1;
            const remainingTime = lessonTimeRequired - lessonTime - startTime;
            timeDisplay.innerHTML = `本套题还剩余${remainingTime}秒完成`;
            if (remainingTime < 0) {
                clearInterval(interval);
                window.location.href = `${origin}/index.php/home/Index/index.html`;
            }
        }, 1000);
    }
});
