document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.more-detail').addEventListener('click', openPopup);
    document.querySelector('.close-btn').addEventListener('click', closePopup);

    function openPopup() {
        document.getElementById('popup').style.display = 'block';
    }
    function closePopup() {
        document.getElementById('popup').style.display = 'none';
    }
});