<?php
include "../../lib/conn.php";

  $sql = "delete from st_master where status='삭제' ";
  $result = db_delete($sql);
 
  if( $result == 'ok' ) {
    echo 'st_master table new data deleted';
  }
  else {
    echo $result;
  }

db_close();
?>