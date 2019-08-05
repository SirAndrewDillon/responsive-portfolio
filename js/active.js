<script>
    $(function(){

        $('.navbar-right li').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
        });
    })
</script>