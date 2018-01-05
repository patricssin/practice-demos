<?php
	$yaochaxundeyonghuming = $_GET["yaochaxundeyonghuming"];

	mysql_connect("localhost", "root", "123456");
	mysql_select_db("myfistdb");
	mysql_query("SET NAMES UTF8");
	$sql = "SELECT * FROM banji1029 WHERE namee = '{$yaochaxundeyonghuming}'";
	$result = mysql_query($sql);
	$tiaomu = mysql_num_rows($result);
	
    if($tiaomu > 0 ){
        echo "you";
    }else{
        echo "mei";
    }
	
?>