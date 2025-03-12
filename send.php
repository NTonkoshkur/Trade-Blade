<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $token = "7776276196:AAHAYNJy2j5_GGuaPnucGay3TEUix6Q6NYo";
        $chat_id = "539597744";
        $message = "Новая почта\nE-mail: " . $email;
        $url = "https://api.telegram.org/bot$token/sendMessage";
        $data = ["chat_id" => $chat_id, "text" => $message, "parse_mode" => "HTML"];

        $options = [
            "http" => [
                "header" => "Content-Type: application/x-www-form-urlencoded\r\n",
                "method" => "POST",
                "content" => http_build_query($data),
            ],
        ];
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        if ($result) {
            echo "success";
        } else {
            echo "error";
        }
    } else {
        echo "invalid";
    }
} else {
    http_response_code(403);
    echo "Forbidden";
}
