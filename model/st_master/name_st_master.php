<?php
include "../../lib/conn.php";

$st_id = $_GET[ 'st_id' ];

if( $st_id ) {
  $sql = "select name from st_master where id=".$st_id ;
}

$name = db_select_row($sql);

echo $name;

db_close();
?>