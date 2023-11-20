<?php

$db_user = "root";
$db_pass = "";
$dsn = 'mysql:dbname=VENTAS;host=localhost';

$json = $_POST["json"];
$data = json_decode($json);

$category = $data-> idcategoria;
$nombre = $data-> nombre;
$precio = $data-> precio;
$stock = $data-> stock;
$id = $data-> id;

try {
    $dbconn = new PDO($dsn, $db_user, $db_pass);
    //$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $sql = "UPDATE PRODUCTO SET idcat=:idcat, nombre=:nombre, precio=:precio, stock=:stock WHERE idprod=:id;";
    $statement = $dbconn->prepare($sql);
    $statement->bindParam(":id", $id);
    $statement->bindParam(":idcat", $category);
    $statement->bindParam(":nombre", $nombre);
    $statement->bindParam(":precio", $precio);
    $statement->bindParam(":stock", $stock);
    $statement->execute();

} catch (PDOException $e) {
    throw $e;
}