<?php
	$yhm = $_POST["yhm"];
	$mm = $_POST["mm"];

	mysql_connect("localhost","root","123456");
    // 选择用哪个数据库
    mysql_select_db("myfistdb");
    // 设置中文的字符集
    mysql_query("SET NAMES UTF8");
    // 执行的sql命令
    $sql = "INSERT INTO banji1029 (namee,qq) VALUE ('{$yhm}','{$mm}')";
    // 执行
    $result = mysql_query($sql);

    if($result == 1){
    	echo "success";
    }else{
    	echo "fail";
    }
?>