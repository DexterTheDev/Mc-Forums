const announceCreate = () => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({ content: document.getElementById("announceContent").value }),
        url: `/announcement/create`,
        dataType: "json",
        contentType: 'application/json',
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message)
            else {
                tata.success("Success", res.message);
                location.reload(true)
            }
        }
    });
}

const deleteAnnounce = (id) => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({ id }),
        url: `/announcement/delete`,
        dataType: "json",
        contentType: 'application/json',
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message)
            else {
                tata.success("Success", res.message);
                location.reload(true)
            }
        }
    });
}

const userAction = () => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({ id: document.getElementById("userID").value }),
        url: `/user/action`,
        dataType: "json",
        contentType: 'application/json',
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message)
            else tata.success("Success", res.message);
        }
    });
};

const banUser = (id) => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({ id }),
        url: `/reports/user/ban`,
        dataType: "json",
        contentType: 'application/json',
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message)
            else tata.success("Success", res.message);
        }
    });
};

const deleteUserReport = (id) => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({ id }),
        url: `/reports/user/delete`,
        dataType: "json",
        contentType: 'application/json',
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message)
            else {
                tata.success("Success", res.message);
                location.reload(true)
            }
        }
    });
}


const archiveUserReport = (id) => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({ id }),
        url: `/reports/user/archive`,
        dataType: "json",
        contentType: 'application/json',
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message)
            else {
                tata.success("Success", res.message);
                location.reload(true)
            }
        }
    });
};

const archiveReport = (id) => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({ id }),
        url: `/reports/archive`,
        dataType: "json",
        contentType: 'application/json',
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message)
            else {
                tata.success("Success", res.message);
                location.reload(true)
            }
        }
    });
};

const lockTicket = (id) => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({ id }),
        url: `/tickets/lock`,
        dataType: "json",
        contentType: 'application/json',
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message)
            else {
                tata.success("Success", res.message);
                location.reload(true)
            }
        }
    });
};

const deleteReport = (id) => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({ id }),
        url: `/reports/delete`,
        dataType: "json",
        contentType: 'application/json',
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message)
            else {
                tata.success("Success", res.message);
                location.reload(true)
            }
        }
    });
}

const deleteTicket = (id) => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({ id }),
        url: `/tickets/delete`,
        dataType: "json",
        contentType: 'application/json',
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message)
            else {
                tata.success("Success", res.message);
                location.reload(true)
            }
        }
    });
}

const deleteThread = (id) => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({ id }),
        url: `/reports/deleteThread`,
        dataType: "json",
        contentType: 'application/json',
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message)
            else {
                tata.success("Success", res.message);
                location.reload(true)
            }
        }
    });
}
