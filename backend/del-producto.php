<?php

$db_user = "root";
$db_pass = "";
$dsn = 'mysql:dbname=VENTAS;host=localhost';

$id_prod = $_POST["json"];

try {
    $dbconn = new PDO($dsn, $db_user, $db_pass);
    //$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "DELETE FROM PRODUCTO WHERE idprod=:idprod;";
    $statement = $dbconn->prepare($sql);
    $statement->bindParam(":idprod", $id_prod);
    $statement->execute();

} catch (PDOException $e) {
    //throw $th;
}