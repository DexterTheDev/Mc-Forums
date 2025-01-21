const push = (data) => {
    $("#chatbox").append(`<div id="${data.id}" class="mb-3">
    <div class="flex">
        <img src="${ data.authorData.avatar }" class="w-9 h-9 rounded-full" alt="Avatar">&nbsp;
        <p class="font-semibold text-white text-lg pt-1">${ data.authorData.tag }<b
                class="text-sm font-medium text-gray-200 pl-2">${ data.plainDate }</b></p>
    </div>
    <p class="font-medium text-white text-base md:pl-10 pt-1"><i class="fa fa-arrow-right"></i>&nbsp;&nbsp;${ data.content }</p>
</div>`);
};

const reply = (id) => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({
            content: document.getElementById("content").value,
        }),
        url: `/tickets/reply/${id}`,
        dataType: "json",
        contentType: "application/json",
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message);
            else {
                tata.success("Success", res.message);
                push(res.reply);
            }
        },
    });
};
setInterval(() => {
    $.ajax({
        type: "GET",
        url: `/ticket/${document.getElementById("ticketID").innerText}/chat`,
        dataType: "json",
        contentType: "application/json",
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message);
            else {
                let chat = [];
                res.chat.map(msg => {
                    chat.push(`<div id="${msg.id}" class="mb-3">
                    <div class="flex">
                        <img src="${ msg.authorData.avatar }" class="w-9 h-9 rounded-full" alt="Avatar">&nbsp;
                        <p class="font-semibold text-white text-lg pt-1">${ msg.authorData.tag }<b
                                class="text-sm font-medium text-gray-200 pl-2">${ msg.plainDate }</b></p>
                    </div>
                    <p class="font-medium text-white text-base md:pl-10 pt-1"><i class="fa fa-arrow-right"></i>&nbsp;&nbsp;${ msg.content }</p>
                </div>`);
                });

                $("#chatbox").html(chat.join(" "));
            }
        },
    });

}, 3000)