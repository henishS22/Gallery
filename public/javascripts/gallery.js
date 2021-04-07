const all = document.getElementById("all");
const favourite = document.getElementById("favourites");
const showProfile = document.getElementById("showProfile");
const fileImage = document.getElementById("fileImage");
const fileVideo = document.getElementById("fileVideo");
let file1 = [];

async function show() {
    const profile = await axios.get(
        `${window.location.origin}/api/v1/user/info`,
        {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        }
    );
    const id = profile.data.data._id;
    location.href = `/slideshow?id=${id}`;
}

showProfile.addEventListener("click", async function () {
    const profile = await axios.get(
        `${window.location.origin}/api/v1/user/info`,
        {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        }
    );
    const id = profile.data.data._id;
    location.href = `/profile?id=${id}`;
});

async function showFav() {
    const token = localStorage.getItem("Authorization");
    if (!token) {
        location.href = "/login";
    } else {
        const profile = await axios.get(
            `${window.location.origin}/api/v1/user/info`,
            {
                headers: {
                    Authorization: localStorage.getItem("Authorization"),
                },
            }
        );
        favourite.style.color = "white";
        favourite.style.backgroundColor = "#42B32F";
        const id = profile.data.data._id;
        location.href = `/favourites?id=${id}`;
    }
}

async function showAll() {
    const user = await axios.get(
        `${window.location.origin}/api/v1/media/all-image`,
        {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        }
    );
    location.href = `/gallery?user=${user.data.data[0].user}&type=img`;
}

async function addToFav(imgId) {
    const favId = await axios.put(
        `${window.location.origin}/api/v1/media/add-to-fav`,
        {
            id: imgId,
        },
        {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        }
    );
    alert("Added To Favourites");
    location.href = `/favourites?id=${favId.data.data.user}`;
}

async function removeFav(imgId) {
    const favId = await axios.put(
        `${window.location.origin}/api/v1/media/remove-fav`,
        {
            id: imgId,
        },
        {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        }
    );
    alert("Removed from Favourites");
    location.href = `/favourites?id=${favId.data.data.user}`;
}

const fileUpload = async (file) => {
    for (let i = 0; i < file.files.length; i++) {
        file1.push(file.files[i]);
    }
};

async function uploadMedia(type) {
    var bodyFormData = new FormData();
    file1.forEach((el) => {
        if (el.type == "image/png" || el.type == "image/jpeg") {
            bodyFormData.append("media", el);
        } else {
            bodyFormData = "";
            file1 = "";
            fileVideo.value = "";
            3;
            alert("Invalid File Format, Upload Images!");
        }
    });
    const user = await axios.post(
        `${window.location.origin}/api/v1/media/add-media?type=img`,
        bodyFormData,
        {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        }
    );
    location.href = `/gallery?user=${user.data.data[0].user}&type=img`;
}

async function deleteImg(imgId, type) {
    const deleteImg = await axios.delete(
        `${window.location.origin}/api/v1/media/delete-image?id=${imgId}`,
        {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        }
    );
    if (type == "img") {
        location.href = `/gallery?user=${deleteImg.data.data.user}&type=img`;
    } else {
        location.href = `/videos?user=${deleteImg.data.data.user}`;
    }
}

async function uploadVideo() {
    var bodyFormData = new FormData();
    file1.forEach((el) => {
        if (el.type == "video/mp4") {
            bodyFormData.append("media", el);
        } else {
            bodyFormData = "";
            file1 = "";
            fileVideo.value = "";
            alert("Invalid File Format, Upload mp4 Videos!");
        }
    });
    const user = await axios.post(
        `${window.location.origin}/api/v1/media/add-media?type=video`,
        bodyFormData,
        {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        }
    );
    if (user.data.data) {
        location.href = `/videos?user=${user.data.data[0].user}`;
    } else {
    }
}

async function showAllVideos() {
    const profile = await axios.get(
        `${window.location.origin}/api/v1/user/info`,
        {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        }
    );
    const id = profile.data.data._id;
    location.href = `/videos?user=${id}`;
}

isToken = () => {
    const token = localStorage.getItem("Authorization");
    if (!token) {
        return false;
    } else {
        return true;
    }
};

/* 
function preventBack() {
    window.history.forward();
}
setTimeout("preventBack()", 0);
window.onunload = function () {
    null;
};
*/

async function logout() {
    localStorage.removeItem("Authorization");
    // preventBack();
    let Backlen = history.length;
    history.go(-Backlen);
    location.href = "/";
}

/* Response.Cache.SetCacheability(HttpCacheability.NoCache);
if(Session["mysession"] != null)
{
response.redirect("login.aspx")
}
else {....} */

/* Add these lines in your html (or view files)

meta(http-equiv='Cache-Control', content='no-store, no-cache, must-revalidate')
meta(http-equiv='Pragma', content='no-cache')
meta(http-equiv='Expires', content='-1')
 */
