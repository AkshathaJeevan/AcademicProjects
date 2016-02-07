import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

import sdsu.*;
import helpers.*;

public class DBInventoryIn extends HttpServlet {


    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    HttpSession session = request.getSession(false);
    if(session == null) {
        ServletContext context = getServletContext();
        RequestDispatcher dispatcher
            = request.getRequestDispatcher("/jsp/login_err.jsp");
        dispatcher.forward(request, response);
        }
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    int onhandflag ;
    int inflag ;
    String sku = request.getParameter("sku"); 
    String date = request.getParameter("date"); 
    String quantity = request.getParameter("qty"); 
    
    int qty = Integer.parseInt(quantity);
    
	Vector<String []> answer = DBHelper.doQuery("SELECT sku, on_hand_quantity FROM on_hand WHERE sku='"+ sku +"'");

	if (answer.size()==0)
	{	
		int rows = DBHelper.doUpdate("insert into on_hand values('"+sku+"','"+date+"','"+qty+"')");
		if (rows != 1)
			onhandflag = 0;
		else
			onhandflag = 1;
	}
	else
	{
		String [] onhandsku = answer.elementAt(0);
		int tbl_qty = Integer.parseInt(onhandsku[1]);
		int new_qty = qty + tbl_qty;
		
		int rows = DBHelper.doUpdate("UPDATE on_hand SET last_date_modified='"+date+"', on_hand_quantity='"+new_qty+"' WHERE sku='"+sku+"'");
		if (rows != 1)
			onhandflag = 0;
		else
			onhandflag = 1;
	}
	
	
	int ans = DBHelper.doUpdate("insert into merchandise_in values('"+sku+"','"+date+"','"+qty+"')");
	if (ans != 1)
			inflag = 0;
		else
			inflag = 1;
	
   	if ((onhandflag==1) && (inflag==1))
    	response.getWriter().write("Successfully Inserted");
    if ((onhandflag==0) || (inflag==0) )
    	response.getWriter().write("Insertion Failed");

    }

    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
        doGet(request, response);
    }
}
