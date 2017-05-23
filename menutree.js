var menu = {"teacher":{"Perencanaan":{"Kompetensi":{"competence_cognitive":"Kognitif","competence_skill":"Ketrerampilan","competence_religius":"Religius","competence_social":"Sosial"},"lesson":"Bahan Ajar","Kelompok":{"group_team":"Membuat Kelompok","group_pair":"Menentukan Pasangan","group_member":"Anggota Kelompok"}},"Aktivitas":{"Kehadiran":{"present_efectiveWeek":"Minggu Efektif","present_presence":"Cek Kehadiran"},"Proyek":{"project_list":"Daftar Proyek","project_course":"Proyek Mata Kuliah","project_item":"Item Penilaian","project_instrument":"Instrumen Penilaian","project_assessing":"Penilaian","project_report":"Laporan"},"performance":{"performance_list":"","performance_item":"","performance_instrument":"","performance_assessing":"","performance_report":""},"quiz":{"quiz_list":"","quiz_item":"","quiz_package":"","quiz_report":"","quiz_analyse":{"quiz_analyse_predictor":"","quiz_analyse_dificulty":"","quiz_analyse_discriminant":"","quiz_analyse_validity":"","quiz_analyse_reliability":""}}},"evaluation":{"result":{"result_cognitive":"","result_skill":""}}},"":null,"student":{"schedule":"","lesson":"","project":"","performance":"","quiz":"","peerAssessment":{"peerAssessment_project":"","peerAssessment_performance":""},"report":{"report_cognitive":"","report_project":"","report_performance":""}},"operator":{"student":{"student_grade_0":"","student_grade_1":"","student_grade_2":"","student_grade_3":"","student_grade":""},"teacher":{"teacher_list":"","teacher_job":""},"classroom":{"classroom_list":"","classroom_room":"","classroom_learner":""},"course":{"course_list":"","course_package":"","course_lecturer":""},"exschool":{"exschool_list":"","exschool_mentor":"","exschool_member":""},"mutation":{"mutation_promotion":"","mutation_graduation":"","mutation_replacement":"","mutation_dropout":""},"setting":{"setting_layout":"","setting_time":"","setting_document":""}}}
function menuTree(obj, route, deep){
	var menu ='';
	if(typeof(obj)=='object'){
		deep++;
		$.each(obj, function(i, v){
			if(i!=''){
				if(route==''){
					route = i;
				}
				if(typeof(v)=='object'){
					menu += '<li class="treeview">';
					menu += '<a href="#" level="'+deep+'"><i class="fa fa-user"></i>'+i+'<i class="fa fa-angle-left pull-right"></i></a>';
				}else{
					menu += '<li class="item">';
					menu += '<a style="padding-top:9px;padding-bottom:9px;" id="'+route+'_'+i+'" href="#" data-href="'+route+'/view/'+i+'" class="btn-load btn-ajax-page" data-target="#workspace" level="'+deep+'">'+v+'<i class="fa fa-'+(typeof(v)=='object' ?'caret-right': i)+'"></i></a>';
				}
				if(typeof(v)=='object'){
					menu += '<ul class="sidebar-menu" style="display: none; padding-left: 15px;">';
	                menu += menuTree(v, route, deep);
					menu += '</ul>'				
				}
				menu += '</li>';
			}
		})
	}
	return menu;
}
function toggleMenu(obj){
	var parent = $(obj).parent().parent();
	$(parent).addClass('menu-open')
	$(parent).addClass('active');
	$(parent).css('display','block');
	return parent;	
}
$(document).ready(function(){
	$('#sidebar').html(menuTree(menu, '', 0));
	$(document).on('click','.treeview a',function(){
		if($(this).attr('data-target')==null){		
			var sister = $(this).parent().children();
			var open = $(sister[1]).hasClass('menu-open');
			var level = $(this).attr('level');
			var child = $(this).children();
			$('.menu-open').removeClass('menu-open')
				.css('display','none');
			if(open){
				$(sister[1]).removeClass('menu-open')
				$(sister[1]).css('display','none')
				$(child[1]).removeClass('fa-angle-down')
				$(child[1]).addClass('fa-angle-left')
			}else{
				$(sister[1]).addClass('menu-open')
				$(sister[1]).css('display','block')
				$(child[1]).removeClass('fa-angle-left')
				$(child[1]).addClass('fa-angle-down')
			}
			var obj = $(this);
			for(i=0;i<level;i++)
			{
				obj = toggleMenu(obj);
			}
		}
	})
})
