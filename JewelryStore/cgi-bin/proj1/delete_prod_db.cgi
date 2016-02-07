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

my $query = "delete from inventories where sku=\"".$sku."\"";


my $sth = $dbh->prepare($query);

if($sth->execute()) {
    $response = "deleted";
    }
else {
    $response = "undeleted";
    }
$sth->finish();
$dbh->disconnect();

print "Content-type: text/html\n\n";
print $response;


