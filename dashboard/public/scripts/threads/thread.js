

const submitReply = () => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({ content: document.getElementById("reply_content").value }),
        url: `/thread/${location.href.split("/thread/")[1]}/reply`,
        dataType: "json",
        contentType: 'application/json',
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message)
            else {
                tata.success("Success", res.message);
                document.getElementById("reply_content").value = "";
                let date = new Date(Number(res.date)).toString().split('2022')[0]
                $("#replies").append(`
                <section id="${res.id}">
                    <div class="my-5">
                        <div class="flex hover:text-gray-300 duration-300 cursor-pointer"
                            onclick="window.open('/profile/${res.id}')">
                            <img src="${res.avatar}" class="w-8 h-8 rounded-full" alt="${res.tag} Avatar">&nbsp;
                            <p class="font-semibold pt-1">${res.tag}&nbsp;<b name="date"
                                    class="text-gray-300 font-medium text-xs">${date}</b></p>
                        </div>
                        <p class="pt-3 pl-4"><i class="fa fa-arrow-right"></i>&nbsp;&nbsp;${res.content}</p>
                    </div>
                </section>
                <hr />
                `);
            };
        }
    });
};

window.addEventListener("load", () => document.getElementsByName("date").forEach(i => {
    i.innerHTML = new Date(Number(i.innerHTML)).toString().split('2022')[0]
}));