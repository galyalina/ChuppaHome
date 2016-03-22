<html>

<body>
<p>
    <?php
    print $_SERVER['PHP_SELF'];
    print ("<br/>");
    print ("Say hallelujah");
    print ("<div w3-include-HTML=\"main.html\"></div>");
    /* This next "phpinfo" business outputs a long page that tells you exactly how your version of PHP is configured. This can be useful when troubleshooting problems down the road */
    //phpinfo();
    ?>
</p>

</body>

</html>