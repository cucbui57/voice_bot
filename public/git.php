<?php
// Use in the "Post-Receive URLs" section of your GitHub repo.
$out = shell_exec( 'cd /home/tokamedia.com/audiopro/;git reset --hard origin/master 2>&1; git pull 2>&1; git add --all 2>&1; git commit -m Demo 2>&1; git push 2>&1; php artisan cache:clear');
echo '<pre>'.$out.'</pre>';
