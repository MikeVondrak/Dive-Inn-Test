insert into "font_set"("set_id","set_name","fk_font_type_id","fk_font_instance_id") values('94ba389d-ae2e-4652-b5ce-282d84140ec7','aaaaaaa',1,1),('94ba389d-ae2e-4652-b5ce-282d84140ec7','aaaaaaa',2,1),('94ba389d-ae2e-4652-b5ce-282d84140ec7','aaaaaaa',3,1),('94ba389d-ae2e-4652-b5ce-282d84140ec7','aaaaaaa',4,1),('94ba389d-ae2e-4652-b5ce-282d84140ec7','aaaaaaa',5,1) RETURNING id, set_id, set_name, fk_font_type_id, fk_font_instance_id