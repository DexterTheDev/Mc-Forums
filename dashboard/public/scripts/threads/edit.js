const submitThread = () => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({
            threadName: document.getElementById("threadName").value,
            threadContent: easyMDE.value(),
            Tos: document.getElementById("check").checked,
            closed: document.getElementById("repliesCheck").checked
        }),
        url: `/thread/${location.href.split("/thread/")[1]}`,
        dataType: "json",
        contentType: 'application/json',
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message)
            else {
                tata.success("Success", res.message);
                location.href = `/thread/${res.id}`
            }
        }
    });
}