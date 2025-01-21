const submitReport = () => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({
            content: document.getElementById("content").value
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