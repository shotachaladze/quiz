<?php

$arr=get_defined_vars();
$gets=$arr["_GET"];

$obj=new ArrayObject($gets);
$it=$obj->getIterator();
while($it->valid()) {
    $it->next();
}

$i=0;
foreach ($it as $key=>$val) {
	if($i==0) {
		$url="https://opentdb.com/api.php?".$key."=".$val;
	} else {
		$url.="&".$key."=".$val;
	}
	$i++;
}
header('Content-Type: application/json');

$json = file_get_contents($url);
$data = json_decode($json, true);
echo $json;

?>
