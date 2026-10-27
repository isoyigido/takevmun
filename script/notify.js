// Central Notification Data Source (Use real ISO timestamps or Date objects)
const NOTIFICATIONS_DATA = [
    {
        id: "1",
        title: "Komite Konuları Açıklandı!",
        message: "Konferansa başvurmadan önce bütün komiteleri incelemenizi tavsiye ederiz.",
        link: "committees.html",
        date: "2026-10-27T20:00:00"
    }
];

// Automatic time ago formatter
function timeAgo(dateString) {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " yıl önce";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " ay önce";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " gün önce";

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " saat önce";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " dk önce";

    return "Az önce";
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("notificationBtn");
    const dropdown = document.getElementById("notificationDropdown");
    const list = document.getElementById("notificationList");
    const unreadDot = document.getElementById("unreadDot");
    const markAllBtn = document.getElementById("markAllReadBtn");

    const getReadIds = () => JSON.parse(localStorage.getItem("readNotifications") || "[]");
    const saveReadIds = (ids) => localStorage.setItem("readNotifications", JSON.stringify(ids));

    function render() {
        const readIds = getReadIds();
        list.innerHTML = "";

        let unreadCount = 0;

        if (NOTIFICATIONS_DATA.length === 0) {
            list.innerHTML = `<div class="no-notifications">Henüz bir bildirim yok.</div>`;
            unreadDot.classList.remove("active");
            return;
        }

        NOTIFICATIONS_DATA.forEach(item => {
            const isRead = readIds.includes(item.id);
            if (!isRead) unreadCount++;

            const notifEl = document.createElement("a");
            notifEl.href = item.link;
            notifEl.className = `notification-item ${isRead ? "read" : "unread"}`;
            notifEl.innerHTML = `
                <div class="notification-title">${item.title}</div>
                <div class="notification-message">${item.message}</div>
                <div class="notification-time">${timeAgo(item.date)}</div>
            `;

            notifEl.addEventListener("click", () => {
                markAsRead(item.id);
            });

            list.appendChild(notifEl);
        });

        if (unreadCount > 0) {
            unreadDot.classList.add("active");
        } else {
            unreadDot.classList.remove("active");
        }
    }

    function markAsRead(id) {
        const readIds = getReadIds();
        if (!readIds.includes(id)) {
            readIds.push(id);
            saveReadIds(readIds);
            render();
        }
    }

    markAllBtn.addEventListener("click", () => {
        const allIds = NOTIFICATIONS_DATA.map(n => n.id);
        saveReadIds(allIds);
        render();
    });

    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
            dropdown.classList.remove("open");
        }
    });

    render();
});