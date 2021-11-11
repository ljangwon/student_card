<?php
//SQL환경 설정
global $DB_HOST,$DB_USER,$DB_PASSWD,$DB_SNAME,$db_link;

$DB_HOST="jakeleanco.ipdisk.co.kr";
$DB_USER="codei";
$DB_PASSWD="111111";
$DB_SNAME="leanmath";
$db_link = false;

//DB 서버 연결
function db_conn(){
  global $DB_HOST,$DB_USER,$DB_PASSWD,$DB_SNAME;
  global $db_link;
  
  $db_link = new mysqli( $DB_HOST, $DB_USER,$DB_PASSWD, $DB_SNAME);

  $db_error = $db_link->connect_error;
  if($db_error) {
    die("접속 오류: ". $db_error);
  }
return $db_link;
}

//DB update 
function db_update($sql) {
  global $db_link;
  //연결확인
  if(!$db_link)
  {
    $db_link = db_conn();
  }  

  if( $db_link->query($sql) === TRUE ) {
    return 'ok';
  }
  else {
    return "update 오류: " .$sql . "<br>" . $db_link->error;
  }
}

//DB insert
function db_insert($sql) {
  global $db_link;
//연결확인
  if(!$db_link)
	{
		$db_link=db_conn();
	}  

  if( $db_link->query($sql) === TRUE ) {
    echo 'ok';
  }
  else {
    echo "insert 오류: " .$sql . "<br>" . $db_link->error;
  }
}

//DB delete
function db_delete($sql) {
  global $db_link;
//연결확인
if(!$db_link)
{
  $db_link=db_conn();
}  
  if( $db_link->query($sql) === TRUE ) {
    echo 'ok';
  }
  else {
    echo "delete 오류: " .$sql . "<br>" . $db_link->error;
  }
}

//DB select one row
function db_select_row($sql) {
  global $db_link;
  //연결확인
  if(!$db_link)
  {
    $db_link=db_conn();
  }  
  if( $result = $db_link->query($sql) ) {
    //echo "one row is selected ";
    
    $rows = mysqli_fetch_array($result);
    return $rows[0];
  }
  else {
    echo "select row 오류: " .$sql . "<br>" . $db_link->error;
    return null;
  }
}

//DB select rows
function db_select_rows($sql) {
  global $db_link;
//연결확인
if(!$db_link)
{
  $db_link=db_conn();
}  
  if( $result = $db_link->query($sql) ) {
    return $result;
  }
  else {
    echo "select rows 오류: " .$sql . "<br>" . $db_link->error;
    return null;
  }

}

//DB close
function db_close() {
  global $db_link;
  if($db_link) {
    $db_link->close();
  }  
}
