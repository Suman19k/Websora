<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

header('Content-Type: text/plain; charset=utf-8');

/* ================= REQUEST CHECK ================= */
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit('Invalid request.');
}

/* ================= HONEYPOT ================= */
if (!empty($_POST['website'])) {
    exit('Spam detected.');
}

/* ================= INPUT CLEANER ================= */
function clean_input($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

/* ================= FORM DATA ================= */
$name    = clean_input($_POST['full_name'] ?? '');
$email   = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$phone = clean_input($_POST['phone'] ?? '');
$subject = clean_input($_POST['subject'] ?? '');
$message = clean_input($_POST['message'] ?? '');

if (!$email || empty($name) || empty($subject) || empty($message) || empty($phone)) {
    exit('Please fill in all required fields.');
}

/* ================= META INFO ================= */
$userIP   = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
$dateTime = date('d M Y, h:i A');

/* ================= SMTP CONFIG ================= */
$adminEmail = 'info@rpbuilds.in';
$smtpHost   = 'smtp.hostinger.com';
$smtpPass   = 'Rpbuilders@2000'; 

/* ================= BRAND DETAILS ================= */
$brandColor = '#111111';
$logoUrl    = 'https://rpbuilds.in/images/rpbuilder_logo.png';
$whatsapp   = '917975860025';

/* ================= EMAIL WRAPPER ================= */
function emailWrapper($content, $brandColor, $logoUrl) {
    return "
    <div style='max-width:600px;margin:auto;font-family:Arial,sans-serif;border:1px solid #eaeaea'>
        <div style='background:#ffffff;padding:20px;text-align:center'>
            <img src='$logoUrl' alt='RP Builders' style='max-width:260px'>
        </div>
        <div style='padding:25px;font-size:14px;color:#333'>
            $content
        </div>
        <div style='background:#f8f9fa;padding:15px;font-size:12px;color:#666;text-align:center'>
            © ".date('Y')." RP Builders | Mysuru, Karnataka
        </div>
    </div>";
}

/* ================= FOOTER ================= */
$footer = "
<hr>
<p style='font-size:13px;line-height:1.6'>
<strong>RP Builders</strong><br>
Netaji Circle,<br>
Mysuru – 570033<br>
📞 +91 7975860025<br>
✉️ info@rpbuilds.in
</p>

<p>
<a href='https://wa.me/$whatsapp'
style='background:#25D366;color:#fff;padding:10px 18px;text-decoration:none;border-radius:4px'>
💬 Chat on WhatsApp
</a>
</p>

<p style='font-size:12px;color:#888'>
IP Address: $userIP<br>
Submitted on: $dateTime
</p>
";

/* ================= SEND ADMIN EMAIL ================= */
try {

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $adminEmail;
    $mail->Password   = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom($adminEmail, 'RP Builders');
    $mail->addAddress($adminEmail);
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = "New Inquiry from $name";

    $adminContent = "
        <h3>New Contact Inquiry</h3>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Subject:</strong> $subject</p>
        <p><strong>Message:</strong><br>$message</p>
        $footer
    ";

    $mail->Body = emailWrapper($adminContent, $brandColor, $logoUrl);
    $mail->send();

    /* ================= AUTO-REPLY ================= */
    $reply = new PHPMailer(true);
    $reply->isSMTP();
    $reply->Host       = $smtpHost;
    $reply->SMTPAuth   = true;
    $reply->Username   = $adminEmail;
    $reply->Password   = $smtpPass;
    $reply->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $reply->Port       = 587;

    $reply->setFrom($adminEmail, 'RP Builders');
    $reply->addAddress($email, $name);
    $reply->isHTML(true);
    $reply->Subject = "Thank you for contacting RP Builders";

    $userContent = "
        <p>Dear <strong>$name</strong>,</p>
        <p><strong>Your Phone:</strong> $phone</p>

        <p>Thank you for contacting <strong>RP Builders</strong>.</p>
        <p>We have received your message and our team will get back to you shortly.</p>

        <p><strong>Subject:</strong> $subject</p>

        <p>
        <a href='https://rpbuilds.in'
        style='background:#111111;color:#fff;padding:10px 18px;text-decoration:none;border-radius:4px'>
        Visit Our Website
        </a>
        </p>

        $footer

        <p style='font-size:11px;color:#999'>
        This is an automated confirmation email. Please do not reply.
        </p>
    ";

    $reply->Body = emailWrapper($userContent, $brandColor, $logoUrl);
    $reply->send();

    echo 'OK';

} catch (Exception $e) {
    echo 'Mailer Error: ' . $e->getMessage();
}
