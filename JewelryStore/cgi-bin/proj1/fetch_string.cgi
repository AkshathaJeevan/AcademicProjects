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
#my $query = "select * from inventories ORDER by sku;";
my $query = "select  * from inventories where sku=\"".$sku."\"";

my $sth = $dbh->prepare($query);
$sth->execute();
$count =0;

while(my @row=$sth->fetchrow_array()) {
    foreach $item (@row) {
	if($count == 1)
	{
		my $vendor_query = "select vendor_name from vendors where id=\"".$item."\"";
		$vth = $dbh->prepare($vendor_query);
		$vth->execute();
		while (my @results = $vth->fetchrow())
 		{
		$response .= $results[0]."|";
		}

	}
	elsif ($count == 2)
	{
		my $category_query = "select category_name from categories where id=\"".$item."\"";
                $cth = $dbh->prepare($category_query);
                $cth->execute();
                while (my @results = $cth->fetchrow())
                {
                $response .= $results[0]."|";
                }

	} 
	else {
        $response .= $item."|"; #field separator
	     }
	$count++;
        }
    $response = substr $response, 0, (length($response)-1);
    $response .= "||";  #record separator
    }
    $response = substr $response, 0, (length($response)-2);
unless($response) {
    $response = "not_found";
    }
$sth->finish();
$dbh->disconnect();

print "Content-type: text/html\n\n";
print $response;
