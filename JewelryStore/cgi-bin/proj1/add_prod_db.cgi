#!/usr/bin/perl

use DBI;
use CGI;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn019";
my $username = "jadrn019";
my $password = "half";
my $database_source = "dbi:mysql:$database:$host:$port";
my $response = "";

my $dbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';

my $q = new CGI;
my $sku = $q->param("sku");
my $vendor = $q->param("vendor");
my $category = $q->param("category");
my $prod_id = $q->param("prod_id");
my $description = $q->param("description");
my $feature = $q->param("feature");
my $cp = $q->param("cp");
my $sp = $q->param("sp");
my $img = $q->param("image");

$prod_id =~ s/\'/\'\'/g;
$description =~ s/\'/\'\'/g;
$feature =~ s/\'/\'\'/g;

        my $ath = "INSERT INTO inventories VALUES(".
        "'$sku',$vendor,$category,'$prod_id','$description','$feature',$cp,$sp,'$img');";

         $rows_affected = $dbh->do($ath);

        if ($rows_affected != 1)
        {
          $dbh->errstr();
          $dbh->state();
	$response="Already exists";

}
else
{
	$response=" Added";
}


$dbh->disconnect();

print "Content-type: text/html\n\n";
print $response;
