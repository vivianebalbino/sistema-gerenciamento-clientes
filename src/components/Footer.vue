<template>
    <footer id="footer">
        <p class="copyright">@FCC &copy; 2024</p>
    </footer>
</template>
<script>
export default {
    name: 'Footer'
}
</script>
<style scoped>
#footer {
    padding-top: 10px;
    background-color: #a90637;
    padding-bottom: 10px;
    padding-left: 5%;
    font-size: 13px;
    border-top: 2px solid #686465;
    display: flex;
    align-items: center;
    justify-content: end;
    bottom: 0;
    width: 100%;
    height: 40px;
    margin: auto;
    position: fixed;
    padding-right: 29px;
}

.copyright{
    color: #ffff;
}

    
</style>