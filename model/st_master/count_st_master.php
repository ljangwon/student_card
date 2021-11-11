<?php
include "../../lib/conn.php";

$sql1 = " select count(*) as cnt from st_master where grade1='초등' and status='재원' ";
$sql2 = " select count(*) as cnt from st_master where grade1='중등' and status='재원' ";
$sql3 = " select count(*) as cnt from st_master where grade1='고등' and status='재원' ";
$sql4 = " select count(*) as cnt from st_master where status='대기' ";

$e_count = db_select_row($sql1);
$m_count = db_select_row($sql2);
$h_count = db_select_row($sql3);
$w_count = db_select_row($sql4);

echo "<br>[초등: ";
echo $e_count;
echo "명, 중등: ";
echo $m_count;
echo "명, 고등: ";
echo $h_count;
echo "명] ";
echo "[총 ";
echo $e_count+$m_count+$h_count;
echo "명] ";
echo "[대기 ";
echo $w_count;
echo "명]<br> ";

db_close();
?>