using AutoMapper;
using Dividas.Dominio;
using Dividas.Dominio.Identity;
using Dividas.WebApi.Dtos;

namespace Dividas.WebApi.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //CreateMap<Divida, DividaDto>();
            CreateMap<DividaDto, Divida>().ReverseMap();
            CreateMap<UserDto, User>().ReverseMap();
            CreateMap<UserLoginDto, User>().ReverseMap();
        }   
    }
}