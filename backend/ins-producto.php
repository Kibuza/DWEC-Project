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

try {
    $dbconn = new PDO($dsn, $db_user, $db_pass);
    //$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $sql = "INSERT INTO PRODUCTO (idcat, nombre, precio, stock) VALUES (:idcat, :nombre, :precio, :stock);";
    $statement = $dbconn->prepare($sql);
    $statement->bindParam(":idcat", $category);
    $statement->bindParam(":nombre", $nombre);
    $statement->bindParam(":precio", $precio);
    $statement->bindParam(":stock", $stock);
    $statement->execute();
    $result = $statement->fetch();

} catch (PDOException $e) {
    //throw $th;
}