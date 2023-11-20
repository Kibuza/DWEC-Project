<?php

$db_user = "root";
$db_pass = "";
$dsn = 'mysql:dbname=VENTAS;host=localhost';

try {
    $dbconn = new PDO($dsn, $db_user, $db_pass);
    //$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $sql = "SELECT nombre, precio, stock, idcat, idprod FROM PRODUCTO;";
    $statement = $dbconn->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Convertir el array a JSON
    $jsonResult = json_encode($result);

    // Imprimir el JSON para su uso en JavaScript
    echo $jsonResult;

} catch (PDOException $e) {
    //throw $th;
}