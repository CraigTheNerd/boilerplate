<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//require PHPMailer.php
require 'libs/phpmailer/src/Exception.php';
require 'libs/phpmailer/src/PHPMailer.php';
require 'libs/phpmailer/src/SMTP.php';

//  ReCaptcha Response
if(isset($_POST['g-recaptcha-response'])) {
    $secret = "6LeskNQaAAAAAPLkgZ2DTsM_yb97dVtrY5vxKbrc";
    $user = $_POST['g-recaptcha-response'];
    $json = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$user");
    $result = json_decode($json, true);
    if($result['success'] == 1) {
        $captcha;
    }else {
        $emptycaptcha = 'Captcha Empty';
    }
}

//  Sanitize Data
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = trim($_POST["name"]);
    $phone = trim($_POST["phone"]);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);
    if(isset($_POST['g-recaptcha-response'])){
        $captcha = $_POST['g-recaptcha-response'];
    }
}

//  XSS Prevention
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = stripslashes($_POST["name"]);
    $email = stripslashes($_POST["email"]);
    $phone = stripslashes($_POST["phone"]);
    $message = stripslashes($_POST["message"]);
}

//  XSS Prevention
$name = htmlspecialchars($name, ENT_QUOTES);
$email = htmlspecialchars($email, ENT_QUOTES);
$phone = htmlspecialchars($phone, ENT_QUOTES);
$message = htmlspecialchars($message, ENT_QUOTES);

//  Check if all required fields have been completed
if (empty($name) || empty($email) || empty($message) || empty($captcha)) {
    http_response_code(http_response_code(400));
    echo '
        <div class="error-message error-fail">
            <div class="fail-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <p class="error-fail-text">
                Please complete all the required form fields and check the captcha.
            </p>
       </div>
       ';
    exit;
}

//  Check that name contains only alphabetic characters
if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
    http_response_code(http_response_code(400));
    echo '
        <div class="error-message error-fail">
            <div class="fail-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <p class="error-fail-text">
                Please enter a valid name.
            </p>
       </div>
   ';
    exit;
}

//  Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(http_response_code(400));
    echo '
        <div class="error-message error-fail">
            <div class="fail-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <p class="error-fail-text">
                Please enter a valid email address.
            </p>
       </div>
   ';
    exit;
}

//  Check phone
if($phone == "0") {
    http_response_code(http_response_code(400));
    echo '
        <div class="error-message error-fail">
            <div class="fail-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <p class="error-fail-text">
                Please enter a valid 10 digit phone number. Do not enter any spaces.
            </p>
       </div>
   ';
    exit;
}

//  Check phone number format
if(!empty($phone)) {
    if(strlen($phone) < 10 || strlen($phone) == "0" || !preg_match("/^(\+27|27)?(\()?0?[87654321][0123467](\))?( |-|\.|_)?(\d{3})( |-|\.|_)?(\d{4})/m", $phone)) {
        http_response_code(http_response_code(400));
        echo '
            <div class="error-message error-fail">
                <div class="fail-icon">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <p class="error-fail-text">
                    Please enter a valid 10 digit phone number. Do not enter any spaces.
                </p>
           </div>
   ';
        exit;
    }
}

//  If no phone number was submitted
if(empty($phone)) {
    $phone = 'No Phone Number Submitted';
}


//  PASS
if (!empty($name) OR !empty($email) OR !empty($message) OR !empty($captcha)) {
    http_response_code(http_response_code(200));

    // Send the mail
    //Instantiation and passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_OFF;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host = 'azna.co.za';                     //Set the SMTP server to send through
        $mail->SMTPAuth = true;                                   //Enable SMTP authentication
        $mail->Username = 'htmlcontactform@azna.co.za';                     //SMTP username
        $mail->Password = 'G99HYPtfaQdHhbcW';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port = 587;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

        //Recipients
        $mail->setFrom('info@azna.co.za', 'Azna Technology');
        $mail->addAddress('craig@azna.co.za', 'Craig Christians');     //Add a recipient
        $mail->addReplyTo($email);

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Dev Test Contact Form';
        $mail->Body = 'From: ' . $name .
            '<br/>' .
            'Email: ' . $email .
            '<br/>' .
            'Phone Number: ' . $phone .
            '<br/>' .
            'Message: ' . '<p>' . $message . '</p>';

//        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        echo '<div class="error-message error-pass"><div class="pass-icon"><i class="fas fa-check-circle"></i></div><p class="error-pass-text">Message Sent.</p></div>';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

}
