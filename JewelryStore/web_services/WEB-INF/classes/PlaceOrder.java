import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

import sdsu.*;
import helpers.*;

public class PlaceOrder extends HttpServlet {


    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    
     	out.println("<html>");
        out.println("<head>");
	out.println("<link rel='stylesheet' type='text/css' href='/jadrn019/css/home.css' /> ");
	out.println("<title> Confirmation Page </title>");
	out.println("<script type='text/javascript'> history.go(1);</script>");
        out.println("</head>");
        out.println("<body onunload=''>");
	out.println("<div id='header'><h2>Jewelry Empire</h2><div id='navigation'><ul><li><a href='/jadrn019/proj3.html'>Home</a></li>");
        out.println("<li><a href='/jadrn019/product.html'>Collections</a></li> ");
        out.println("<li><a href='/jadrn019/order.html'>Shopping Cart</a></li>" );    
        out.println("<li><a href='/jadrn019/about.html'>Contact</a></li> </ul></div> </div> ");
        out.println("<br/><div id='confirmation'>Thank You for Shopping with us. The following order has been Successfully Placed !!! <br/><br/><table><th>Product Name</th><th>Product ID</th><th>Quantity</th><th>Price</th>");

	
	String fname = request.getParameter("b_fname"); 
	String lname = request.getParameter("b_lname"); 
	String total = request.getParameter("total"); 
    String cartCount = request.getParameter("count"); 
    int count = Integer.parseInt(cartCount);
    
    String date = request.getParameter("date"); 

    for (int i = 1; i <= count; i++)
  { 
  	 out.println("<tr>");
    String nameString = "p_name"+i;
    String name = request.getParameter(nameString);
    String skuString = "p_sku"+i;
    String sku = request.getParameter(skuString);
    String qtyString = "quantity"+i;
    String qtyInString = request.getParameter(qtyString);
    int qty = Integer.parseInt(qtyInString);
    String priceString = "price"+i;
    String price = request.getParameter(priceString);
    String cpString = "cp"+i;
    String cp = request.getParameter(cpString);
 	 out.println("<td>");
 	 out.println(name);
 	 out.println("</td><td>");
 	 out.println(sku);
 	 out.println("</td> <td>");
 	 out.println(qty);
 	 out.println("</td> <td>");
 	 out.println(price); 
 	 out.println("</td></tr>");


	int intableflag=0 ;
	int inflag=0 ;
	int onhandflag=0 ;
	int new_qty = 0;
	int tbl_qty;

	Vector<String []> answer = DBHelper.doQuery("SELECT on_hand_quantity FROM on_hand WHERE sku='"+ sku +"'");
	if (answer.size() !=0)
	{
		String [] onhandsku = answer.elementAt(0);
		tbl_qty = Integer.parseInt(onhandsku[0]);
		new_qty = tbl_qty - qty;
	}
	else
	{
		tbl_qty = 0;
	}

	if (answer.size()==0 || new_qty < 0 )
	{	
		intableflag = 0;
	}
	else
	{
		intableflag = 1;
		
		int rows = DBHelper.doUpdate("UPDATE on_hand SET last_date_modified='"+date+"', on_hand_quantity='"+new_qty+"' WHERE sku='"+sku+"'");
		if (rows != 1)
			onhandflag = 0;
		else
			onhandflag = 1;
			
		int ans = DBHelper.doUpdate("insert into merchandise_out values('"+sku+"','"+date+"','"+qty+"')");
		if (ans != 1)
			inflag = 0;
		else
			inflag = 1;
	}
}	
	out.println("</table>");
	out.println("<br/><br/> Total Billed Amount was: ");
	out.println(total);
	out.println("</div></body>");
	out.println("</html>");

	out.close();
}

    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
        doGet(request, response);
    }
}
